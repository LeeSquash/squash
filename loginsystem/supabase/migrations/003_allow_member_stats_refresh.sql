-- Fix the protected import function so Supabase's safe-update rule accepts
-- replacing the complete imported dataset. Run after migrations 001 and 002.

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
