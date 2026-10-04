# API / Backend Integration

The original project describes a Supabase Edge Function that replicates objects
from Supabase Storage to AWS S3.

The actual browser dashboard currently demonstrates the replication workflow
with local state and SHA-256 hashing. Do not put AWS secret keys in the frontend.

## Backend technologies

- Supabase Edge Functions
- Deno / TypeScript
- Supabase Storage
- AWS S3
- Supabase PostgreSQL
