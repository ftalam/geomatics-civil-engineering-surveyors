-- Run this in Supabase SQL Editor.
-- Purpose: allow Geoshop "View Details" modal to load Specifications, Resources, and multiple Images from DB.

alter table public.products
  add column if not exists specifications jsonb,
  add column if not exists resources jsonb;

-- Ensure images column exists and defaults to an array.
alter table public.products
  add column if not exists images text[] default '{}';

-- Backfill images[] from existing single-image columns when needed.
update public.products
set images = array_remove(array[coalesce(image_url, image)], null)
where (images is null or cardinality(images) = 0)
  and (image_url is not null or image is not null);

-- Example update for one existing product.
-- Replace YOUR_PRODUCT_ID with the product id (uuid/int from your table).
update public.products
set
  description = 'Android-Powered Total Station for Surveying and Engineering',
  images = array[
    'https://YOUR-PROJECT.supabase.co/storage/v1/object/public/product-images/cts-a100-main.png',
    'https://YOUR-PROJECT.supabase.co/storage/v1/object/public/product-images/cts-a100-side.png'
  ],
  specifications = '[
    {
      "title": "Measurements",
      "items": [
        "Angular accuracy : 2\"",
        "Range with prism : 5000 m max.",
        "Reflectorless range : 1500 max."
      ]
    },
    {
      "title": "System",
      "items": [
        "Operating System : Android"
      ]
    },
    {
      "title": "Display",
      "items": [
        "Screen size : 5\"",
        "Screen resolution : 1280 x 720"
      ]
    },
    {
      "title": "Physical",
      "items": [
        "Battery life : Up to 8 hours"
      ]
    }
  ]'::jsonb,
  resources = '[
    {
      "language": "en",
      "name": "CTS-A100 Datasheet (EN).pdf",
      "size": "4.10 MB",
      "url": "https://YOUR-PROJECT.supabase.co/storage/v1/object/public/product-docs/CTS-A100-DS-EN.pdf"
    },
    {
      "language": "fr",
      "name": "CTS-A100 Datasheet (FR).pdf",
      "size": "3.90 MB",
      "url": "https://YOUR-PROJECT.supabase.co/storage/v1/object/public/product-docs/CTS-A100-DS-FR.pdf"
    }
  ]'::jsonb
where id = 'YOUR_PRODUCT_ID';

-- Example insert for a new product.
insert into public.products (
  name,
  category,
  description,
  price,
  rating,
  reviews,
  images,
  specifications,
  resources
)
values (
  'CHCNAV ViLi i100',
  'GNSS',
  'Visual-LiDAR GNSS RTK receiver with consistent accuracy in obstructions',
  1200000,
  4.8,
  12,
  array[
    'https://YOUR-PROJECT.supabase.co/storage/v1/object/public/product-images/vili-main.png'
  ],
  '[
    {
      "title": "Positioning",
      "items": [
        "GNSS : Full GNSS",
        "IMU : 200 Hz",
        "Precision max. : 0.8 cm H / 1.5 cm V"
      ]
    }
  ]'::jsonb,
  '[
    {
      "language": "en",
      "name": "ViLi_i100_DS_EN.pdf",
      "size": "4.10 MB",
      "url": "https://YOUR-PROJECT.supabase.co/storage/v1/object/public/product-docs/ViLi_i100_DS_EN.pdf"
    }
  ]'::jsonb
);
