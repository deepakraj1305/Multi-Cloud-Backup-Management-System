import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import S3 from 'https://esm.sh/aws-sdk@2.1490.0/clients/s3';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const s3 = new S3({
  accessKeyId: Deno.env.get('AWS_ACCESS_KEY_ID'),
  secretAccessKey: Deno.env.get('AWS_SECRET_ACCESS_KEY'),
  region: Deno.env.get('AWS_REGION')
});

Deno.serve(async (req) => {
  try {
    const { record } = await req.json();
    const { id: fileId, primary_storage_path, sha256_hash, name } = record;

    // 1. Download from Supabase Storage
    const { data, error } = await supabase.storage
      .from('dualcloud-prod-primary')
      .download(primary_storage_path);

    if (error) throw error;

    // 2. Upload to AWS S3 (Immutable Vault)
    const s3Key = \
