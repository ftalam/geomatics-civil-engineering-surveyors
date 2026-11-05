-- Run this in the Supabase SQL editor before deploying register-user.
-- Limits each source IP to five registrations per rolling hour.
create table if not exists public.register_rate_limits (
  ip text primary key,
  window_started_at timestamptz not null default now(),
  attempt_count integer not null default 1
);

alter table public.register_rate_limits enable row level security;
revoke all on public.register_rate_limits from public, anon, authenticated;

create or replace function public.consume_register_rate_limit(p_ip text)
returns boolean
language plpgsql
security definer
set search_path = public
set row_security = off
as $$
declare
  current_attempt_count integer;
begin
  if p_ip is null or length(p_ip) > 64 then
    return false;
  end if;

  delete from public.register_rate_limits
  where window_started_at < now() - interval '24 hours';

  insert into public.register_rate_limits (ip, window_started_at, attempt_count)
  values (p_ip, now(), 1)
  on conflict (ip) do update
    set window_started_at = case
          when register_rate_limits.window_started_at < now() - interval '1 hour'
            then now()
          else register_rate_limits.window_started_at
        end,
        attempt_count = case
          when register_rate_limits.window_started_at < now() - interval '1 hour'
            then 1
          else register_rate_limits.attempt_count + 1
        end
  returning attempt_count into current_attempt_count;

  return current_attempt_count <= 5;
end;
$$;

revoke all on function public.consume_register_rate_limit(text) from public, anon, authenticated;
grant execute on function public.consume_register_rate_limit(text) to service_role;
