-- Run in the Supabase SQL editor before publishing registration and
-- deploying unsubscribe-marketing. Existing users are left unsubscribed.
create table if not exists public.marketing_preferences (
  user_id uuid primary key references auth.users (id) on delete cascade,
  marketing_consent boolean not null default false,
  consented_at timestamptz,
  unsubscribed_at timestamptz,
  unsubscribe_token uuid unique,
  created_at timestamptz not null default now(),
  constraint marketing_preferences_token_matches_consent
    check (
      (marketing_consent and unsubscribe_token is not null)
      or (not marketing_consent and unsubscribe_token is null)
    )
);

alter table public.marketing_preferences enable row level security;
revoke all on public.marketing_preferences from public, anon, authenticated;
grant all on public.marketing_preferences to service_role;

create or replace function public.handle_new_marketing_preference()
returns trigger
language plpgsql
security definer
set search_path = public
set row_security = off
as $$
declare
  has_marketing_consent boolean :=
    coalesce(new.raw_user_meta_data->>'marketing_consent', 'false') = 'true';
begin
  insert into public.marketing_preferences (
    user_id,
    marketing_consent,
    consented_at,
    unsubscribe_token
  )
  values (
    new.id,
    has_marketing_consent,
    case when has_marketing_consent then now() else null end,
    case when has_marketing_consent then gen_random_uuid() else null end
  )
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_marketing_preference_created on auth.users;
create trigger on_auth_user_marketing_preference_created
  after insert on auth.users
  for each row execute procedure public.handle_new_marketing_preference();

insert into public.marketing_preferences (user_id, marketing_consent)
select id, false
from auth.users
on conflict (user_id) do nothing;
