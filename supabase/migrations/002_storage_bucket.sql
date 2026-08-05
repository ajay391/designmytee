-- Ensure storage bucket 'design-files' is public
insert into storage.buckets (id, name, public)
values ('design-files', 'design-files', true)
on conflict (id) do update set public = true;

-- Drop all existing policies on storage.objects for design-files
drop policy if exists "Public Read Access design-files" on storage.objects;
drop policy if exists "Public Upload Access design-files" on storage.objects;
drop policy if exists "Public Update Access design-files" on storage.objects;
drop policy if exists "Public Delete Access design-files" on storage.objects;
drop policy if exists "Give users access to own folder 1ffg0oo_0" on storage.objects;
drop policy if exists "Allow all uploads to design-files" on storage.objects;
drop policy if exists "Allow all selects from design-files" on storage.objects;

-- Allow SELECT (Read) for anyone
create policy "Allow all selects from design-files"
on storage.objects for select
to public, authenticated, anon
using (bucket_id = 'design-files');

-- Allow INSERT (Upload) for anyone (authenticated and anon users)
create policy "Allow all uploads to design-files"
on storage.objects for insert
to public, authenticated, anon
with check (bucket_id = 'design-files');

-- Allow UPDATE for anyone
create policy "Allow all updates to design-files"
on storage.objects for update
to public, authenticated, anon
using (bucket_id = 'design-files')
with check (bucket_id = 'design-files');

-- Allow DELETE for anyone
create policy "Allow all deletes from design-files"
on storage.objects for delete
to public, authenticated, anon
using (bucket_id = 'design-files');
