-- Store customer messages and order preferences submitted from the cart.
alter table public.orders
  add column if not exists special_requests jsonb;

comment on column public.orders.special_requests is
  'Structured customer order message: specialMessage, estimateDemo, buyRent, aob.';
