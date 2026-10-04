# DualCloud Sync: Cross-Cloud Backup and Synchronization Manager

DualCloud Sync is a cloud backup management dashboard designed around
cross-cloud replication between **Supabase Storage** and **AWS S3**.

## Technologies Used

### Frontend
- React 18
- Vite
- Tailwind CSS
- Chart.js
- Web Crypto API (SHA-256)

### Backend / Cloud
- Supabase
- Supabase PostgreSQL
- Supabase Storage
- Supabase Edge Functions
- Deno + TypeScript
- AWS S3

### Deployment
- Vercel
- GitHub

## Project Structure

```text
dualcloud-sync/
├── public/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css
├── api/
│   └── README.md
├── supabase/
│   ├── functions/
│   │   └── replicate-cross-cloud/
│   │       └── index.ts
│   └── migrations/
│       └── schema.sql
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
├── vite.config.js
└── README.md
```

## What It Does

1. Accepts a file upload in the dashboard.
2. Calculates a SHA-256 checksum in the browser.
3. Represents the primary upload destination as Supabase Storage.
4. Uses a Supabase Edge Function architecture to replicate the object to AWS S3.
5. Tracks replication status and backup jobs in PostgreSQL.
6. Provides storage statistics, logs, policies and disaster-recovery UI.

> Note: The supplied original website is primarily a frontend/demo dashboard.
> The Supabase and AWS integration files included here provide the intended
> production backend structure. Configure the cloud services and environment
> secrets before using real replication.

## Installation

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env` and configure the frontend Supabase values.

AWS credentials must be stored as **Supabase Edge Function secrets**, not exposed
through the Vite frontend.

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/migrations/schema.sql` in the Supabase SQL Editor.
3. Configure the storage bucket.
4. Set Edge Function secrets for AWS.
5. Deploy the Edge Function:

```bash
supabase functions deploy replicate-cross-cloud
```

## Security

Never commit:

- `.env`
- AWS secret access keys
- Supabase service-role keys

Only public/publishable frontend keys should use the `VITE_` prefix.

## License

For educational/project demonstration use.
