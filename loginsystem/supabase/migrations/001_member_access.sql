-- Member access and competition-stat privacy.
-- Apply this in the Supabase SQL Editor before connecting the web app.

create table if not exists public.member_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  share_competition_stats boolean not null default true,
  player_key text unique,
  role text not null default 'member' check (role in ('member', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  sharing_consent_at timestamptz
);

create table if not exists public.competition_stats (
  id bigint generated always as identity primary key,
  player_key text not null,
  player_name text not null,
  competition text not null,
  season text not null,
  points numeric,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists competition_stats_player_key_idx
  on public.competition_stats (player_key);

create table if not exists public.player_summaries (
  player_key text primary key,
  level integer not null default 1,
  total_points numeric not null default 0,
  rank integer,
  updated_at timestamptz not null default now()
);

alter table public.player_summaries enable row level security;

alter table public.member_profiles enable row level security;
alter table public.competition_stats enable row level security;

revoke all on public.member_profiles from anon, authenticated;
grant select on public.member_profiles to authenticated;
grant update (display_name, share_competition_stats)
  on public.member_profiles to authenticated;

revoke all on public.competition_stats from anon, authenticated;
grant all on public.competition_stats to service_role;
revoke all on public.player_summaries from anon, authenticated;
grant all on public.player_summaries to service_role;

create or replace function public.is_member_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.member_profiles
    where user_id = (select auth.uid())
      and role = 'admin'
  );
$$;

revoke all on function public.is_member_admin() from public, anon;
grant execute on function public.is_member_admin() to authenticated;

drop policy if exists "Members can read their own profile"
  on public.member_profiles;
create policy "Members can read their own profile"
  on public.member_profiles
  for select
  to authenticated
  using (user_id = (select auth.uid()) or (select public.is_member_admin()));

drop policy if exists "Members can update their own profile"
  on public.member_profiles;
create policy "Members can update their own profile"
  on public.member_profiles
  for update
  to authenticated
  using (user_id = (select auth.uid()) or (select public.is_member_admin()))
  with check (user_id = (select auth.uid()) or (select public.is_member_admin()));

create or replace function public.set_member_profile_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  if new.share_competition_stats is distinct from old.share_competition_stats then
    new.sharing_consent_at :=
      case when new.share_competition_stats then now() else null end;
  end if;
  return new;
end;
$$;

revoke all on function public.set_member_profile_updated_at()
  from public, anon, authenticated;

drop trigger if exists member_profile_updated_at on public.member_profiles;
create trigger member_profile_updated_at
before update on public.member_profiles
for each row execute function public.set_member_profile_updated_at();

create or replace function public.create_member_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  member_name text;
  sharing_choice boolean;
begin
  member_name := nullif(trim(new.raw_user_meta_data ->> 'display_name'), '');
  if member_name is null then
    member_name := coalesce(split_part(new.email, '@', 1), 'Member');
  end if;

  sharing_choice :=
    coalesce(new.raw_user_meta_data ->> 'share_competition_stats', 'true') = 'true';

  insert into public.member_profiles (
    user_id,
    display_name,
    share_competition_stats,
    sharing_consent_at
  )
  values (
    new.id,
    member_name,
    sharing_choice,
    case when sharing_choice then now() else null end
  );

  return new;
end;
$$;

revoke all on function public.create_member_profile()
  from public, anon, authenticated;

drop trigger if exists on_auth_user_created_member_profile on auth.users;
create trigger on_auth_user_created_member_profile
after insert on auth.users
for each row execute function public.create_member_profile();

create or replace view public.member_competition_stats
with (security_invoker = false)
as
select
  case
    when member.share_competition_stats then stats.player_name
    else 'Anonymous player'
  end as player_name,
  stats.competition,
  stats.season,
  stats.points
from public.competition_stats as stats
left join public.member_profiles as member
  on member.player_key = stats.player_key;

revoke all on public.member_competition_stats from public, anon;
grant select on public.member_competition_stats to authenticated;

create or replace view public.my_player_summary
with (security_invoker = false)
as
select summary.level, summary.total_points, summary.rank
from public.member_profiles as profile
join public.player_summaries as summary
  on summary.player_key = profile.player_key
where profile.user_id = (select auth.uid());

revoke all on public.my_player_summary from public, anon;
grant select on public.my_player_summary to authenticated;

create or replace function public.admin_list_members()
returns table (
  user_id uuid,
  email text,
  display_name text,
  share_competition_stats boolean,
  player_key text,
  player_name text,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    profile.user_id,
    account.email::text,
    profile.display_name,
    profile.share_competition_stats,
    profile.player_key,
    stats.player_name,
    profile.created_at
  from public.member_profiles as profile
  join auth.users as account on account.id = profile.user_id
  left join lateral (
    select competition_stats.player_name
    from public.competition_stats
    where competition_stats.player_key = profile.player_key
    limit 1
  ) as stats on true
  where public.is_member_admin()
  order by profile.created_at;
$$;

create or replace function public.admin_list_player_keys()
returns table (player_key text, player_name text)
language sql
stable
security definer
set search_path = ''
as $$
  select stats.player_key, min(stats.player_name) as player_name
  from public.competition_stats as stats
  where public.is_member_admin()
  group by stats.player_key
  order by min(stats.player_name);
$$;

create or replace function public.admin_link_member(
  target_user_id uuid,
  target_player_key text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_member_admin() then
    raise exception 'Administrator access required';
  end if;

  if target_player_key is not null and not exists (
    select 1
    from public.competition_stats
    where player_key = target_player_key
  ) then
    raise exception 'Player record not found';
  end if;

  update public.member_profiles
  set player_key = target_player_key
  where user_id = target_user_id;

  if not found then
    raise exception 'Member account not found';
  end if;
end;
$$;

revoke all on function public.admin_list_members() from public, anon;
revoke all on function public.admin_list_player_keys() from public, anon;
revoke all on function public.admin_link_member(uuid, text) from public, anon;
grant execute on function public.admin_list_members() to authenticated;
grant execute on function public.admin_list_player_keys() to authenticated;
grant execute on function public.admin_link_member(uuid, text) to authenticated;

-- After your first verified account exists, promote it in the SQL Editor:
-- update public.member_profiles
-- set role = 'admin'
-- where user_id = (
--   select id from auth.users where email = 'YOUR-EMAIL-ADDRESS'
-- );
