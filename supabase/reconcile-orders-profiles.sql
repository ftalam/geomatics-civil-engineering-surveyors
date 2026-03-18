-- Run this in the Supabase SQL editor for the SAME project your app uses (VITE_SUPABASE_URL).
-- Purpose:
-- 1) Ensure every auth user gets a public.profiles row (trigger on auth.users)
-- 2) Add a stable numeric order number (orders.order_number) for "Order #1" display
-- 3) Provide baseline RLS policies so:
--    - users can read/insert their own orders
--    - admins (profiles.role = 'admin') can read/update all orders
--    - users can read/insert/update their own profile; admins can read all profiles

-- -------------------------
-- Admin helper (SECURITY DEFINER)
-- Notes:
-- - We use SECURITY DEFINER so the function can safely check the caller's profile
--   even when RLS is enabled on public.profiles (avoids recursion / policy deadlocks).
-- -------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
set row_security = off
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  );
$$;

-- -------------------------
-- Profiles: auto-create on signup
-- -------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  phone text,
  role text default 'user',
  created_at timestamptz default now()
);

alter table public.profiles
  add column if not exists email text,
  add column if not exists phone text;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
set row_security = off
as $$
begin
  insert into public.profiles (id, email, phone)
  values (
    new.id,
    coalesce(new.email, new.raw_user_meta_data->>'email'),
    coalesce(new.phone, new.raw_user_meta_data->>'phone')
  )
  on conflict (id) do update
    set
      email = coalesce(excluded.email, profiles.email),
      phone = coalesce(excluded.phone, profiles.phone);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Backfill profiles for existing auth users (safe to run multiple times).
insert into public.profiles (id, email, phone)
select
  u.id,
  coalesce(u.email, u.raw_user_meta_data->>'email'),
  coalesce(u.phone, u.raw_user_meta_data->>'phone')
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null
on conflict (id) do update
  set
    email = coalesce(excluded.email, profiles.email),
    phone = coalesce(excluded.phone, profiles.phone);

-- -------------------------
-- Orders: numeric order_number
-- -------------------------
alter table public.orders
  add column if not exists order_number bigint;

create sequence if not exists public.orders_order_number_seq;

alter table public.orders
  alter column order_number set default nextval('public.orders_order_number_seq');

-- Backfill existing orders that have no order_number, preserving arrival order.
with offset as (
  select coalesce(max(order_number), 0) as max_order_number
  from public.orders
  where order_number is not null
),
ordered as (
  select
    o.id,
    (select max_order_number from offset)
      + row_number() over (order by o.created_at asc, o.id asc) as next_order_number
  from public.orders o
  where o.order_number is null
)
update public.orders o
set order_number = ordered.next_order_number
from ordered
where o.id = ordered.id;

-- Ensure new numbers keep incrementing from the max.
select setval(
  'public.orders_order_number_seq',
  coalesce((select max(order_number) from public.orders), 0)
);

-- Optional uniqueness constraint (safe to run after backfill).
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'orders_order_number_unique'
  ) then
    alter table public.orders
      add constraint orders_order_number_unique unique (order_number);
  end if;
end $$;

-- -------------------------
-- RLS policies (baseline)
-- -------------------------
alter table public.profiles enable row level security;
alter table public.orders enable row level security;

-- Profiles
drop policy if exists "profiles_select_self_or_admin" on public.profiles;
create policy "profiles_select_self_or_admin"
  on public.profiles
  for select
  using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_insert_self" on public.profiles;
create policy "profiles_insert_self"
  on public.profiles
  for insert
  with check (auth.uid() = id);

drop policy if exists "profiles_update_self" on public.profiles;
create policy "profiles_update_self"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Orders
drop policy if exists "orders_select_self_or_admin" on public.orders;
create policy "orders_select_self_or_admin"
  on public.orders
  for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "orders_insert_self" on public.orders;
create policy "orders_insert_self"
  on public.orders
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "orders_update_admin_only" on public.orders;
create policy "orders_update_admin_only"
  on public.orders
  for update
  using (public.is_admin())
  with check (public.is_admin());
