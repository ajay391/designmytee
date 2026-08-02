-- DesignMyTee Stage 1 — Initial Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ============================================
-- PROFILES
-- ============================================
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '',
  email text not null default '',
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin', 'designer')),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Ensure columns exist if table pre-existed
alter table profiles add column if not exists name text not null default '';
alter table profiles add column if not exists email text not null default '';
alter table profiles add column if not exists phone text;
alter table profiles add column if not exists role text not null default 'customer';
alter table profiles add column if not exists avatar_url text;

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, phone)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'name', split_part(coalesce(new.email, ''), '@', 1)),
    new.raw_user_meta_data->>'phone'
  )
  on conflict (id) do update set
    email = excluded.email,
    name = coalesce(excluded.name, public.profiles.name),
    phone = coalesce(excluded.phone, public.profiles.phone);
  return new;
exception when others then
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ============================================
-- DESIGN REQUESTS
-- ============================================
create table if not exists design_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  tracking_code text unique not null,
  title text not null,
  description text not null,
  reference_images text[] default '{}',
  tshirt_type text,
  preferred_colors text,
  print_placement text,
  quantity integer default 1,
  budget_range text,
  deadline date,
  status text not null default 'submitted' check (
    status in ('submitted','in_review','assigned','in_progress',
               'awaiting_feedback','revision_requested','approved',
               'completed','cancelled')
  ),
  assigned_designer_id uuid references profiles(id) on delete set null,
  priority text not null default 'normal' check (priority in ('low','normal','high','urgent')),
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-generate tracking code
create or replace function generate_tracking_code()
returns trigger language plpgsql as $$
declare
  new_code text;
  counter int := 0;
begin
  loop
    new_code := 'DMT-' || lpad(floor(random() * 9000 + 1000)::text, 4, '0');
    begin
      new.tracking_code := new_code;
      exit;
    exception when unique_violation then
      counter := counter + 1;
      if counter > 10 then
        raise exception 'Could not generate unique tracking code';
      end if;
    end;
  end loop;
  return new;
end;
$$;

drop trigger if exists set_tracking_code on design_requests;
create trigger set_tracking_code
  before insert on design_requests
  for each row execute procedure generate_tracking_code();

-- ============================================
-- DESIGN REVISIONS
-- ============================================
create table if not exists design_revisions (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references design_requests(id) on delete cascade,
  version_number integer not null default 1,
  file_url text not null,
  comment text,
  uploaded_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ============================================
-- DESIGN MESSAGES
-- ============================================
create table if not exists design_messages (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references design_requests(id) on delete cascade,
  sender_id uuid references profiles(id) on delete set null,
  sender_role text not null check (sender_role in ('customer','admin','designer')),
  message_text text not null,
  attachment_url text,
  created_at timestamptz not null default now()
);

-- ============================================
-- BULK REQUESTS
-- ============================================
create table if not exists bulk_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  contact_name text not null,
  contact_phone text not null,
  contact_email text not null,
  product_type text not null,
  quantity integer not null,
  fabric text,
  print_type text,
  size_mix jsonb default '{}',
  notes text,
  status text not null default 'new' check (
    status in ('new','quoted','accepted','converted','closed')
  ),
  quoted_price numeric(10,2),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- PRODUCTS (Our Own Designs catalog)
-- ============================================
drop table if exists products cascade;

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  price numeric(10,2) not null,
  compare_at_price numeric(10,2),
  category text not null default 'general',
  images text[] default '{}',
  sizes text[] default '{}',
  colors text[] default '{}',
  stock_quantity integer not null default 0,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- ============================================
-- ADDRESSES
-- ============================================
create table if not exists addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  pincode text not null,
  phone text,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================
-- ORDERS (unified — shop/design_request/bulk_request)
-- ============================================
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  source text not null check (source in ('shop','design_request','bulk_request')),
  design_request_id uuid references design_requests(id) on delete set null,
  bulk_request_id uuid references bulk_requests(id) on delete set null,
  items jsonb not null default '[]',
  subtotal numeric(10,2) not null default 0,
  shipping_fee numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  status text not null default 'pending' check (
    status in ('pending','confirmed','printing','shipped','delivered','cancelled','refunded')
  ),
  shipping_address jsonb,
  payment_status text not null default 'pending' check (
    payment_status in ('pending','paid','failed','refunded')
  ),
  payment_id text,
  razorpay_order_id text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- GALLERY ITEMS (Latest Work showcase)
-- ============================================
create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  category text,
  technique text,
  design_request_id uuid references design_requests(id) on delete set null,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================
-- UPDATED_AT TRIGGERS
-- ============================================
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at before update on profiles
  for each row execute procedure set_updated_at();
create trigger set_design_requests_updated_at before update on design_requests
  for each row execute procedure set_updated_at();
create trigger set_bulk_requests_updated_at before update on bulk_requests
  for each row execute procedure set_updated_at();
create trigger set_products_updated_at before update on products
  for each row execute procedure set_updated_at();
create trigger set_orders_updated_at before update on orders
  for each row execute procedure set_updated_at();

-- ============================================
-- RLS POLICIES
-- ============================================
alter table profiles enable row level security;
alter table design_requests enable row level security;
alter table design_revisions enable row level security;
alter table design_messages enable row level security;
alter table bulk_requests enable row level security;
alter table products enable row level security;
alter table addresses enable row level security;
alter table orders enable row level security;
alter table gallery_items enable row level security;

-- Helper: check if current user is admin
create or replace function is_admin()
returns boolean language sql security definer as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- Helper: check if admin or designer
create or replace function is_admin_or_designer()
returns boolean language sql security definer as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role in ('admin', 'designer')
  );
$$;

-- PROFILES
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Admins can view all profiles" on profiles for select using (is_admin_or_designer());

-- DESIGN REQUESTS
create policy "Customers can view own requests" on design_requests for select
  using (auth.uid() = user_id);
create policy "Customers can create requests" on design_requests for insert
  with check (auth.uid() = user_id);
create policy "Admins can view all requests" on design_requests for select
  using (is_admin_or_designer());
create policy "Admins can update all requests" on design_requests for update
  using (is_admin_or_designer());
create policy "Designers can view assigned requests" on design_requests for select
  using (auth.uid() = assigned_designer_id);
create policy "Designers can update assigned requests" on design_requests for update
  using (auth.uid() = assigned_designer_id);

-- DESIGN REVISIONS
create policy "Users can view revisions for their requests" on design_revisions for select
  using (exists (select 1 from design_requests dr where dr.id = request_id and (dr.user_id = auth.uid() or is_admin_or_designer() or dr.assigned_designer_id = auth.uid())));
create policy "Admin/designers can insert revisions" on design_revisions for insert
  with check (is_admin_or_designer() or exists (select 1 from design_requests dr where dr.id = request_id and dr.assigned_designer_id = auth.uid()));

-- DESIGN MESSAGES
create policy "Users can view messages for their requests" on design_messages for select
  using (exists (select 1 from design_requests dr where dr.id = request_id and (dr.user_id = auth.uid() or is_admin_or_designer() or dr.assigned_designer_id = auth.uid())));
create policy "Participants can send messages" on design_messages for insert
  with check (auth.uid() = sender_id);

-- BULK REQUESTS
create policy "Users can view own bulk requests" on bulk_requests for select
  using (auth.uid() = user_id);
create policy "Anyone can submit bulk requests" on bulk_requests for insert
  with check (true);
create policy "Admins can manage all bulk requests" on bulk_requests for all
  using (is_admin());

-- PRODUCTS
create policy "Anyone can view active products" on products for select
  using (is_active = true or is_admin());
create policy "Admins can manage products" on products for all
  using (is_admin());

-- ADDRESSES
create policy "Users can manage own addresses" on addresses for all
  using (auth.uid() = user_id);
create policy "Admins can view all addresses" on addresses for select
  using (is_admin());

-- ORDERS
create policy "Users can view own orders" on orders for select
  using (auth.uid() = user_id);
create policy "Users can create orders" on orders for insert
  with check (auth.uid() = user_id);
create policy "Admins can manage all orders" on orders for all
  using (is_admin());

-- GALLERY ITEMS
create policy "Anyone can view gallery" on gallery_items for select
  using (true);
create policy "Admins can manage gallery" on gallery_items for all
  using (is_admin());

-- ============================================
-- SEED: Sample products
-- ============================================
insert into products (name, slug, description, price, compare_at_price, category, images, sizes, colors, stock_quantity, is_active, is_featured)
values
  ('Classic Oversized Tee', 'classic-oversized-tee', 'Premium 240 GSM oversized fit. Perfect canvas for custom prints.', 699, 999, 'oversized', '{}', ARRAY['S','M','L','XL','XXL'], ARRAY['White','Black','Grey','Navy'], 50, true, true),
  ('Regular Fit Unisex Tee', 'regular-fit-unisex-tee', 'Everyday comfort in 180 GSM cotton. Crisp and clean.', 499, 699, 'regular', '{}', ARRAY['XS','S','M','L','XL','XXL'], ARRAY['White','Black','Red','Blue'], 80, true, true),
  ('Premium Polo', 'premium-polo', 'Corporate-ready 220 GSM polo with collar. Great for team uniforms.', 899, 1199, 'polo', '{}', ARRAY['S','M','L','XL','XXL'], ARRAY['White','Black','Navy','Maroon'], 40, true, false),
  ('Heavyweight Hoodie', 'heavyweight-hoodie', '320 GSM fleece-lined hoodie. Built for bold prints.', 1499, 1999, 'hoodie', '{}', ARRAY['S','M','L','XL','XXL'], ARRAY['Black','Grey','Olive','Burgundy'], 30, true, true)
on conflict (slug) do nothing;
