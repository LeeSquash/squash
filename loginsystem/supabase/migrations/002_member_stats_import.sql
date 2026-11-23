-- Publish safely imported historic competition data to signed-in members.
-- Run after 001_member_access.sql in the Supabase SQL Editor.

create or replace function public.admin_replace_competition_data(
  stat_rows jsonb,
  summary_rows jsonb
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

  if jsonb_typeof(stat_rows) is distinct from 'array'
    or jsonb_typeof(summary_rows) is distinct from 'array' then
    raise exception 'Competition data must be supplied as arrays';
  end if;

  if jsonb_array_length(stat_rows) > 50000
    or jsonb_array_length(summary_rows) > 20000 then
    raise exception 'Competition import is larger than the allowed limit';
  end if;

  delete from public.competition_stats
  where id is not null;
  delete from public.player_summaries
  where player_key is not null;

  insert into public.competition_stats (
    player_key,
    player_name,
    competition,
    season,
    points,
    details
  )
  select
    imported.player_key,
    imported.player_name,
    imported.competition,
    imported.season,
    imported.points,
    coalesce(imported.details, '{}'::jsonb)
  from jsonb_to_recordset(stat_rows) as imported(
    player_key text,
    player_name text,
    competition text,
    season text,
    points numeric,
    details jsonb
  );

  insert into public.player_summaries (
    player_key,
    level,
    total_points,
    rank
  )
  select
    imported.player_key,
    imported.level,
    imported.total_points,
    imported.rank
  from jsonb_to_recordset(summary_rows) as imported(
    player_key text,
    level integer,
    total_points numeric,
    rank integer
  );
end;
$$;

revoke all on function public.admin_replace_competition_data(jsonb, jsonb)
  from public, anon;
grant execute on function public.admin_replace_competition_data(jsonb, jsonb)
  to authenticated;

create or replace view public.member_competition_stats
with (security_invoker = false)
as
select
  case
    when coalesce(member.share_competition_stats, true) then stats.player_name
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
