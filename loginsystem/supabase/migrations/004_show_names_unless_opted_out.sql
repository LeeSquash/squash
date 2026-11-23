-- Names are visible unless a linked player explicitly chooses to hide theirs.
-- Run after migrations 001, 002, and 003.

alter table public.member_profiles
  alter column share_competition_stats set default true;

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

create or replace view public.member_competition_stats
with (security_invoker = false)
as
select
  case
    when coalesce(member.share_competition_stats, true)
      then stats.player_name
    else 'Anonymous player'
  end as player_name,
  case stats.competition
    when 'peteroberts' then 'Wednesday Handicap'
    when 'sltc' then 'Squash Levels Team Challenge'
    when 'generationcup' then 'Generation Cup'
    when 'juniorclubnight' then 'Junior Handicap'
    when 'racketballclubnight' then 'Racketball Handicap'
    when 'boxleagues' then 'Box Leagues'
    else stats.competition
  end as competition,
  stats.season,
  stats.points,
  stats.competition as competition_id,
  stats.details
from public.competition_stats as stats
left join public.member_profiles as member
  on member.player_key = stats.player_key;

revoke all on public.member_competition_stats from public, anon;
grant select on public.member_competition_stats to authenticated;

create or replace view public.member_leaderboard
with (security_invoker = false)
as
select
  summary.rank,
  case
    when coalesce(member.share_competition_stats, true) then coalesce(
      (
        select min(stats.player_name)
        from public.competition_stats as stats
        where stats.player_key = summary.player_key
      ),
      member.display_name
    )
    else 'Anonymous player'
  end as player_name,
  summary.level,
  summary.total_points
from public.player_summaries as summary
left join public.member_profiles as member
  on member.player_key = summary.player_key;

revoke all on public.member_leaderboard from public, anon;
grant select on public.member_leaderboard to authenticated;

create or replace view public.member_player_profiles
with (security_invoker = false)
as
select
  summary.player_key,
  coalesce(
    (
      select min(stats.player_name)
      from public.competition_stats as stats
      where stats.player_key = summary.player_key
    ),
    member.display_name
  ) as player_name,
  summary.level,
  summary.total_points,
  summary.rank,
  coalesce(
    (
      select jsonb_agg(
        jsonb_build_object(
          'competition_id', stats.competition,
          'competition',
            case stats.competition
              when 'peteroberts' then 'Wednesday Handicap'
              when 'sltc' then 'Squash Levels Team Challenge'
              when 'generationcup' then 'Generation Cup'
              when 'juniorclubnight' then 'Junior Handicap'
              when 'racketballclubnight' then 'Racketball Handicap'
              when 'boxleagues' then 'Box Leagues'
              else stats.competition
            end,
          'season', stats.season,
          'points', stats.points,
          'details', stats.details
        )
        order by stats.season desc
      )
      from public.competition_stats as stats
      where stats.player_key = summary.player_key
    ),
    '[]'::jsonb
  ) as results
from public.player_summaries as summary
left join public.member_profiles as member
  on member.player_key = summary.player_key
where coalesce(member.share_competition_stats, true);

revoke all on public.member_player_profiles from public, anon;
grant select on public.member_player_profiles to authenticated;
