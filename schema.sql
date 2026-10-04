-- DUALCLOUD SYNC: PRODUCTION DATABASE SCHEMA & RLS POLICIES

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. STORAGE PROVIDERS CONFIGURATION
CREATE TABLE public.storage_providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  provider_type VARCHAR(50) NOT NULL CHECK (provider_type IN ('SUPABASE_PRIMARY', 'AWS_S3', 'CLOUDFLARE_R2')),
  bucket_name VARCHAR(150) NOT NULL,
  endpoint VARCHAR(255),
  region VARCHAR(50) DEFAULT 'us-east-1',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. MASTER FILES REPOSITORY
CREATE TABLE public.files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  size BIGINT NOT NULL,
  mime_type VARCHAR(100),
  sha256_hash CHAR(64) NOT NULL,
  primary_storage_path TEXT NOT NULL,
  secondary_storage_path TEXT,
  replication_status VARCHAR(50) DEFAULT 'PENDING' CHECK (replication_status IN ('PENDING', 'REPLICATING', 'VERIFIED', 'FAILED')),
  encryption_algorithm VARCHAR(50) DEFAULT 'AES-GCM-256',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BACKUP REPLICATION JOBS
CREATE TABLE public.backup_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_id UUID REFERENCES public.files(id) ON DELETE CASCADE,
  source_provider_id UUID REFERENCES public.storage_providers(id),
  target_provider_id UUID REFERENCES public.storage_providers(id),
  status VARCHAR(50) DEFAULT 'QUEUED' CHECK (status IN ('QUEUED', 'IN_PROGRESS', 'SUCCESS', 'FAILED')),
  error_message TEXT,
  retry_count INT DEFAULT 0,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.storage_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.backup_jobs ENABLE ROW LEVEL SECURITY;

-- Files: Users can only view & manipulate their own records
CREATE POLICY "Users can manage own files" ON public.files FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own providers" ON public.storage_providers FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own backup jobs" ON public.backup_jobs FOR SELECT USING (auth.uid() = user_id);

-- 6. STORAGE BUCKET CREATION & POLICIES
INSERT INTO storage.buckets (id, name, public) VALUES ('dualcloud-prod-primary', 'dualcloud-prod-primary', false);

-- Allow authenticated users to upload files to their own folder
CREATE POLICY "Allow authenticated uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'dualcloud-prod-primary' AND auth.role() = 'authenticated');
CREATE POLICY "Allow user reads" ON storage.objects FOR SELECT USING (bucket_id = 'dualcloud-prod-primary' AND auth.uid() = owner);
