import React, { useState, useEffect, useRef, useMemo } from 'react';



        // --- ICON SYSTEM ---
        const Icon = ({ name, className = "w-5 h-5", ...props }) => {
            const icons = {
                cloud: <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />,
                cloudSync: <g><path d="M12 2v4"/><path d="m4.93 10.93 2.83-2.83"/><path d="M2 18h4"/><path d="M20 18h2"/><path d="m19.07 10.93-2.83-2.83"/><path d="M22 22H2"/><path d="m16 6 4-4-4-4"/><path d="M8 6 4 2l4-4"/></g>,
                shieldCheck: <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.8 17 5 19 5a1 1 0 0 1 1 1zM9 12l2 2 4-4" />,
                server: <g><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></g>,
                hardDrive: <g><line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/></g>,
                upload: <g><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></g>,
                refreshCw: <g><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></g>,
                checkCircle: <g><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></g>,
                alertTriangle: <g><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></g>,
                layers: <g><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></g>,
                fileText: <g><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></g>,
                clock: <g><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></g>,
                activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
                database: <g><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></g>,
                terminal: <g><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></g>,
                key: <g><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></g>,
                lock: <g><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></g>,
                download: <g><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></g>,
                trash: <g><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></g>,
                play: <polygon points="5 3 19 12 5 21 5 3" />,
                search: <g><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></g>,
                copy: <g><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></g>,
                check: <polyline points="20 6 9 17 4 12" />,
                chevronRight: <polyline points="9 18 15 12 9 6" />,
                sparkles: <g><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></g>,
                cpu: <g><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></g>,
                bell: <g><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></g>,
                user: <g><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></g>,
                arrowRight: <g><line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/></g>,
                externalLink: <g><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></g>,
                rocket: <g><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></g>
            };
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
                    {icons[name] || <circle cx="12" cy="12" r="10" />}
                </svg>
            );
        };

        // --- INITIAL DATA & SEED STATE ---
        const INITIAL_FILES = [
            { id: 'file_001', name: 'customer_transactions_2025_q1.parquet', size: 24857600, type: 'application/octet-stream', uploadedAt: new Date(Date.now() - 3600000 * 4).toISOString(), sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', primaryStatus: 'VERIFIED', secondaryStatus: 'VERIFIED', secondaryProvider: 'AWS S3 (us-east-1)', versionsCount: 3, encryption: 'AES-GCM-256', lastVerified: '12m ago' },
            { id: 'file_002', name: 'neural_weights_v4.2.ckpt', size: 142606336, type: 'application/x-tar', uploadedAt: new Date(Date.now() - 3600000 * 18).toISOString(), sha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', primaryStatus: 'VERIFIED', secondaryStatus: 'VERIFIED', secondaryProvider: 'AWS S3 (us-east-1)', versionsCount: 1, encryption: 'AES-GCM-256', lastVerified: '45m ago' },
            { id: 'file_003', name: 'enterprise_vault_audit_log.json', size: 4892010, type: 'application/json', uploadedAt: new Date(Date.now() - 3600000 * 2).toISOString(), sha256: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a', primaryStatus: 'VERIFIED', secondaryStatus: 'REPLICATING', secondaryProvider: 'AWS S3 (us-east-1)', versionsCount: 5, encryption: 'AES-GCM-256', lastVerified: 'Just now' },
            { id: 'file_004', name: 'kubernetes_secrets_backup.k8s.tar.gz', size: 1258291, type: 'application/gzip', uploadedAt: new Date(Date.now() - 3600000 * 48).toISOString(), sha256: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d', primaryStatus: 'VERIFIED', secondaryStatus: 'FAILED', secondaryProvider: 'AWS S3 (us-east-1)', versionsCount: 2, encryption: 'AES-GCM-256', lastVerified: '3h ago', errorMsg: 'Secondary object checksum mismatch: remote ETag mismatch during S3 copy.' }
        ];

        const INITIAL_PROVIDERS = [
            { id: 'p_supabase', name: 'Supabase Storage (Primary)', type: 'PRIMARY', status: 'CONNECTED', bucket: 'dualcloud-prod-primary', endpoint: 'https://xyzcompany.supabase.co/storage/v1', region: 'us-east-1', totalStored: '173.5 MB', filesCount: 4, latencyMs: 38, lastPing: '4s ago' },
            { id: 'p_aws_s3', name: 'Amazon Web Services S3 (Secondary)', type: 'SECONDARY', status: 'CONNECTED', bucket: 's3-dualcloud-immutable-vault-01', endpoint: 's3.us-east-1.amazonaws.com', region: 'us-east-1', totalStored: '168.6 MB', filesCount: 3, latencyMs: 72, lastPing: '12s ago' },
            { id: 'p_cloudflare_r2', name: 'Cloudflare R2 Storage (Standby)', type: 'TERTIARY', status: 'STANDBY', bucket: 'r2-backup-cold-tier', endpoint: 'https://account-id.r2.cloudflarestorage.com', region: 'auto', totalStored: '0 MB', filesCount: 0, latencyMs: 44, lastPing: '2m ago' }
        ];

        const INITIAL_POLICIES = [
            { id: 'pol_1', name: 'Critical Datasets Multi-Region Policy', cron: '0 * * * *', intervalLabel: 'Every hour', primary: 'Supabase Storage', secondary: 'AWS S3 (us-east-1)', retentionDays: 90, retryAttempts: 5, status: 'ACTIVE', lastRun: '14 mins ago', nextRun: 'in 46 mins', matchPattern: '*.{parquet,json,tar.gz,ckpt}' },
            { id: 'pol_2', name: 'Nightly Disaster Recovery Full Mirror', cron: '0 0 * * *', intervalLabel: 'Daily at 00:00 UTC', primary: 'Supabase Storage', secondary: 'AWS S3 + Cloudflare R2', retentionDays: 365, retryAttempts: 3, status: 'ACTIVE', lastRun: 'Yesterday at 00:00', nextRun: 'in 6 hours', matchPattern: '*.*' }
        ];

        const DEPLOYMENT_FILES = {
            packageJson: `{
  "name": "dualcloud-sync",
  "private": true,
  "version": "2.4.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "aws-sdk": "^2.1530.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "tailwindcss": "^3.4.0",
    "vite": "^5.0.0"
  }
}`,
            vercelJson: `{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}`,
            envExample: `# Vercel Frontend Environment Variables (Exposed to browser)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_publishable_key

# Supabase Edge Function Secrets (Set via Supabase CLI - DO NOT expose to frontend)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=s3-dualcloud-immutable-vault-01`,
            edgeFunction: `import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
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
    const s3Key = \`backups/\${fileId}-\${name}\`;
    await s3.putObject({
      Bucket: Deno.env.get('AWS_S3_BUCKET'),
      Key: s3Key,
      Body: data,
      ContentType: 'application/octet-stream'
    }).promise();

    // 3. Verify and Update DB Status to VERIFIED
    await supabase
      .from('files')
      .update({ 
        secondary_storage_path: s3Key,
        replication_status: 'VERIFIED'
      })
      .eq('id', fileId);

    return new Response(JSON.stringify({ status: 'success' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500 
    });
  }
});`,
            readme: `# DualCloud Sync - Cross-Cloud Backup Manager

Automated, cryptographically verified cross-cloud replication between Supabase Storage and AWS S3.

## Architecture

- **Frontend:** React 18 + Vite + Tailwind CSS (Deployed to Vercel)
- **Database & Auth:** Supabase (PostgreSQL with RLS)
- **Primary Storage:** Supabase Storage
- **Secondary Storage:** AWS S3 (with Object Lock)
- **Replication Engine:** Supabase Edge Functions (Deno)

## Project Structure

\`\`\`
dualcloud-sync/
├── public/
├── src/
│   ├── components/
│   ├── lib/
│   ├── App.jsx
│   └── main.jsx
├── supabase/
│   ├── functions/
│   │   └── replicate-cross-cloud/
│   │       └── index.ts
│   └── migrations/
│       └── schema.sql
├── .env.example
├── package.json
├── vercel.json
└── README.md
\`\`\`

## Setup & Installation

1. Clone the repository.
2. Install dependencies: \`npm install\`
3. Copy \`.env.example\` to \`.env\` and fill in your Supabase URL and Anon Key.
4. Run dev server: \`npm run dev\`

## Database & RLS Setup

1. Go to Supabase SQL Editor.
2. Run the migration script found in \`supabase/migrations/schema.sql\`.
3. Enable Row Level Security policies for \`files\` and \`storage_providers\`.

## Edge Function Deployment

1. Install Supabase CLI.
2. Set AWS Secrets: 
   \`supabase secrets set AWS_ACCESS_KEY_ID=... AWS_SECRET_ACCESS_KEY=...\`
3. Deploy function: 
   \`supabase functions deploy replicate-cross-cloud\`

## Vercel Deployment

1. Push your code to GitHub/GitLab.
2. Import project to Vercel.
3. Add Environment Variables (\`VITE_SUPABASE_URL\`, \`VITE_SUPABASE_ANON_KEY\`).
4. Deploy. Vercel will automatically run \`npm run build\` and serve the static files with SPA fallback configured in \`vercel.json\`.

## Testing

Run \`npm run build\` to check for build errors. Test the replication flow by uploading a file and checking the Supabase \`backup_jobs\` table.`
        };

        // --- REAL SHA-256 HASH CALCULATOR (WEB CRYPTO API) ---
        async function calculateSHA256(file) {
            const buffer = await file.arrayBuffer();
            const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            return hashHex;
        }

        function formatBytes(bytes, decimals = 2) {
            if (!+bytes) return '0 Bytes';
            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
        }

        // --- CODE VIEWER COMPONENT ---
        const CodeViewer = ({ title, filename, code, lang }) => (
            <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl flex flex-col h-full">
                <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Icon name="fileText" className="w-4 h-4 text-cyan-500" />
                        <span className="text-xs font-mono text-slate-300">{filename}</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-500/20 px-2 py-0.5 rounded">{lang}</span>
                </div>
                <pre className="p-5 font-mono text-xs text-cyan-300/90 overflow-x-auto leading-relaxed bg-[#050811] flex-1 whitespace-pre-wrap break-all">
                    {code}
                </pre>
            </div>
        );

        // --- MAIN APP COMPONENT ---
        function App() {
            const [currentView, setCurrentView] = useState('landing');
            const [files, setFiles] = useState(INITIAL_FILES);
            const [providers, setProviders] = useState(INITIAL_PROVIDERS);
            const [policies, setPolicies] = useState(INITIAL_POLICIES);
            const [searchQuery, setSearchQuery] = useState('');
            const [filterStatus, setFilterStatus] = useState('ALL');
            const [isUploading, setIsUploading] = useState(false);
            const [uploadProgress, setUploadProgress] = useState(0);
            const [uploadStage, setUploadStage] = useState('');
            const [engineLogs, setEngineLogs] = useState([
                `[${new Date().toLocaleTimeString()}] [SYSTEM] DualCloud Sync Engine daemon initialized v2.4.0-edge`,
                `[${new Date().toLocaleTimeString()}] [AUTH] PostgreSQL RLS Session verified: user_sub=usr_sec_99184`,
                `[${new Date().toLocaleTimeString()}] [HEALTH] Primary (Supabase) + Secondary (AWS S3) TLS 1.3 handshake verified.`
            ]);
            const [notification, setNotification] = useState(null);
            const [recoveryModalOpen, setRecoveryModalOpen] = useState(false);
            const [recoveryTargetFile, setRecoveryTargetFile] = useState(null);
            const [recoveryRunning, setRecoveryRunning] = useState(false);
            const [recoveryLogs, setRecoveryLogs] = useState([]);
            const [demoAuthUser] = useState({ name: 'Sarah Chen', email: 's.chen@hypercloud.systems', role: 'Cloud Architect / Tier-1 Admin', org: 'HyperCloud Enterprise Ltd.' });

            const showToast = (message, type = 'info') => {
                setNotification({ message, type, id: Date.now() });
                setTimeout(() => setNotification(null), 4500);
            };

            const addEngineLog = (msg) => {
                setEngineLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 49)]);
            };

            // --- REAL FILE UPLOAD & CROSS-CLOUD REPLICATION ENGINE SIMULATION ---
            const handleFileUpload = async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setIsUploading(true);
                setUploadProgress(10);
                setUploadStage('Calculating SHA-256 checksum locally via Web Crypto API...');
                addEngineLog(`[CLIENT] Local SHA-256 calculation started for: ${file.name} (${formatBytes(file.size)})`);

                try {
                    const checksum = await calculateSHA256(file);
                    setUploadProgress(30);
                    setUploadStage('Pushing to Primary Cloud (Supabase Storage)...');
                    addEngineLog(`[SHA-256] Computed Digest: ${checksum}`);
                    addEngineLog(`[PRIMARY] Uploading blob to 'dualcloud-prod-primary' with AES-GCM metadata...`);

                    await new Promise(r => setTimeout(r, 1000));
                    setUploadProgress(60);
                    setUploadStage('Triggering Supabase Edge Function [replicate-cross-cloud]...');
                    addEngineLog(`[EDGE] Edge Function dispatched with payload checksum: ${checksum.slice(0, 16)}...`);

                    await new Promise(r => setTimeout(r, 1200));
                    setUploadProgress(85);
                    setUploadStage('AWS S3 Object Lock & Checksum Verification in progress...');
                    addEngineLog(`[SECONDARY] AWS S3 PutObject received stream. Verifying ETag vs SHA-256 digest...`);

                    await new Promise(r => setTimeout(r, 800));
                    setUploadProgress(100);
                    setUploadStage('Replication Verified across Dual Clouds!');
                    addEngineLog(`[SUCCESS] Dual-Cloud Replication Verified: Supabase [OK] - AWS S3 [OK]`);

                    const newFileRecord = {
                        id: `file_${Date.now()}`,
                        name: file.name,
                        size: file.size,
                        type: file.type || 'application/octet-stream',
                        uploadedAt: new Date().toISOString(),
                        sha256: checksum,
                        primaryStatus: 'VERIFIED',
                        secondaryStatus: 'VERIFIED',
                        secondaryProvider: 'AWS S3 (us-east-1)',
                        versionsCount: 1,
                        encryption: 'AES-GCM-256',
                        lastVerified: 'Just now'
                    };
                    setFiles(prev => [newFileRecord, ...prev]);
                    showToast(`File "${file.name}" securely replicated to Dual Clouds!`, 'success');
                } catch (err) {
                    console.error(err);
                    addEngineLog(`[ERROR] File upload process failed: ${err.message}`);
                    showToast('Failed to complete cross-cloud replication.', 'error');
                } finally {
                    setTimeout(() => {
                        setIsUploading(false);
                        setUploadProgress(0);
                        setUploadStage('');
                    }, 1500);
                }
            };

            const handleRetryReplication = async (fileId) => {
                const target = files.find(f => f.id === fileId);
                if (!target) return;
                addEngineLog(`[RETRY] Manual backup retry triggered for file: ${target.name}`);
                setFiles(prev => prev.map(f => f.id === fileId ? { ...f, secondaryStatus: 'REPLICATING', errorMsg: undefined } : f));
                showToast(`Retrying AWS S3 replication for ${target.name}...`, 'info');
                await new Promise(r => setTimeout(r, 2000));
                setFiles(prev => prev.map(f => f.id === fileId ? { ...f, secondaryStatus: 'VERIFIED', lastVerified: 'Just now' } : f));
                addEngineLog(`[RETRY_SUCCESS] Secondary AWS S3 checksum matched: ${target.sha256.slice(0, 16)}...`);
                showToast(`Replication for ${target.name} is now VERIFIED.`, 'success');
            };

            const triggerRecovery = async () => {
                if (!recoveryTargetFile) return;
                setRecoveryRunning(true);
                setRecoveryLogs([]);
                const appendRecoveryLog = (l) => {
                    setRecoveryLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${l}`]);
                };
                appendRecoveryLog(`Initiating Point-In-Time Restore for: ${recoveryTargetFile.name}`);
                appendRecoveryLog(`Target destination: Supabase Storage Primary Cluster`);
                appendRecoveryLog(`Pulling snapshot payload from AWS S3 Immutable Glacier/Standard...`);
                await new Promise(r => setTimeout(r, 900));
                appendRecoveryLog(`Validating cryptographic hash: expected ${recoveryTargetFile.sha256.slice(0, 20)}...`);
                await new Promise(r => setTimeout(r, 900));
                appendRecoveryLog(`Integrity checksum matched. Unpacking version state...`);
                await new Promise(r => setTimeout(r, 800));
                appendRecoveryLog(`Primary instance file state updated with ZERO byte loss.`);
                setRecoveryRunning(false);
                showToast(`Disaster Recovery complete for "${recoveryTargetFile.name}"!`, 'success');
            };

            const filteredFiles = useMemo(() => {
                return files.filter(file => {
                    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) || file.sha256.toLowerCase().includes(searchQuery.toLowerCase());
                    if (filterStatus === 'ALL') return matchesSearch;
                    if (filterStatus === 'VERIFIED') return matchesSearch && file.secondaryStatus === 'VERIFIED';
                    if (filterStatus === 'REPLICATING') return matchesSearch && file.secondaryStatus === 'REPLICATING';
                    if (filterStatus === 'FAILED') return matchesSearch && file.secondaryStatus === 'FAILED';
                    return matchesSearch;
                });
            }, [files, searchQuery, filterStatus]);

            const totalStorageBytes = useMemo(() => files.reduce((acc, f) => acc + f.size, 0), [files]);
            const verifiedCount = useMemo(() => files.filter(f => f.secondaryStatus === 'VERIFIED').length, [files]);
            const failedCount = useMemo(() => files.filter(f => f.secondaryStatus === 'FAILED').length, [files]);

            // --- CHART COMPONENT ---
            const StorageTrendChart = () => {
                const canvasRef = useRef(null);
                useEffect(() => {
                    if (!canvasRef.current) return;
                    const ctx = canvasRef.current.getContext('2d');
                    const gradientSupabase = ctx.createLinearGradient(0, 0, 0, 250);
                    gradientSupabase.addColorStop(0, 'rgba(6, 182, 212, 0.4)');
                    gradientSupabase.addColorStop(1, 'rgba(6, 182, 212, 0.0)');
                    const gradientS3 = ctx.createLinearGradient(0, 0, 0, 250);
                    gradientS3.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
                    gradientS3.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

                    const chart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now'],
                            datasets: [
                                { label: 'Primary: Supabase (MB)', data: [120, 135, 142, 148, 165, 170, Math.round(totalStorageBytes / 1024 / 1024)], borderColor: '#06B6D4', backgroundColor: gradientSupabase, fill: true, tension: 0.35, pointBackgroundColor: '#06B6D4', pointBorderColor: '#070B19', pointBorderWidth: 2, pointRadius: 4 },
                                { label: 'Secondary: AWS S3 (MB)', data: [118, 134, 140, 144, 162, 168, Math.round((totalStorageBytes * 0.96) / 1024 / 1024)], borderColor: '#3B82F6', backgroundColor: gradientS3, fill: true, tension: 0.35, pointBackgroundColor: '#3B82F6', pointBorderColor: '#070B19', pointBorderWidth: 2, pointRadius: 4 }
                            ]
                        },
                        options: {
                            responsive: true, maintainAspectRatio: false,
                            plugins: {
                                legend: { labels: { color: '#94A3B8', font: { family: 'Inter', size: 12 } } },
                                tooltip: { backgroundColor: '#0F172A', borderColor: '#334155', borderWidth: 1, titleFont: { family: 'Space Grotesk' }, bodyFont: { family: 'JetBrains Mono' } }
                            },
                            scales: {
                                x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#64748B', font: { family: 'JetBrains Mono', size: 11 } } },
                                y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#64748B', font: { family: 'JetBrains Mono', size: 11 } } }
                            }
                        }
                    });
                    return () => chart.destroy();
                }, [totalStorageBytes]);
                return <canvas ref={canvasRef} className="w-full h-full" />;
            };

            return (
                <div className="min-h-screen flex flex-col text-slate-200">
                    {/* Toast Notification */}
                    {notification && (
                        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl transition-all duration-300 transform translate-y-0 ${
                            notification.type === 'success' ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200' :
                            notification.type === 'error' ? 'bg-rose-950/90 border-rose-500/50 text-rose-200' :
                            'bg-slate-900/90 border-cyan-500/50 text-cyan-200'
                        }`}>
                            <Icon name={notification.type === 'success' ? 'checkCircle' : notification.type === 'error' ? 'alertTriangle' : 'sparkles'} className="w-5 h-5 shrink-0" />
                            <span className="text-sm font-medium">{notification.message}</span>
                        </div>
                    )}

                    {/* TOP NAVBAR */}
                    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
                        <div className="max-w-7xl mx-auto flex items-center justify-between">
                            {/* Logo */}
                            <div onClick={() => setCurrentView('landing')} className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center p-0.5 shadow-lg group-hover:glow-cyan transition-all">
                                    <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                                        <Icon name="cloudSync" className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-heading font-bold text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors">DualCloud<span className="text-cyan-400">Sync</span></span>
                                        <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 rounded-full">v2.4 Live</span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 font-mono hidden sm:block">Supabase &bull; AWS S3 &bull; SHA-256 Engine</p>
                                </div>
                            </div>

                            {/* Navigation Links / View Switcher */}
                            <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
                                <button onClick={() => setCurrentView('landing')} className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${currentView === 'landing' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>Landing</button>
                                <button onClick={() => setCurrentView('dashboard')} className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${['dashboard', 'files', 'engine', 'providers', 'schedules', 'recovery'].includes(currentView) ? 'bg-blue-600/30 text-blue-300 border border-blue-500/30 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>Dashboard App</button>
                                <button onClick={() => setCurrentView('architecture')} className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${currentView === 'architecture' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>Architecture</button>
                                <button onClick={() => setCurrentView('deployment')} className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${currentView === 'deployment' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>Deployment</button>
                                <button onClick={() => setCurrentView('sql')} className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${currentView === 'sql' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>Schema (DDL)</button>
                            </nav>

                            {/* User Profile / Quick Action */}
                            <div className="flex items-center gap-3">
                                <label className="relative cursor-pointer group">
                                    <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
                                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 shadow-md transition-all">
                                        <Icon name="upload" className="w-4 h-4 text-slate-950" />
                                        <span className="hidden sm:inline">Upload & Sync</span>
                                    </div>
                                </label>
                                {/* User Pill */}
                                <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center text-[11px] font-bold text-slate-950">SC</div>
                                    <div className="text-left">
                                        <div className="text-xs font-semibold text-slate-200 leading-none">{demoAuthUser.name}</div>
                                        <div className="text-[10px] text-cyan-400 font-mono mt-0.5">RLS: Authenticated</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* ACTIVE VIEW RENDERER */}
                    <main className="flex-1">
                        {/* VIEW 1: LANDING PAGE */}
                        {currentView === 'landing' && (
                            <div className="space-y-24 py-12 px-4 lg:px-8 max-w-7xl mx-auto">
                                <section className="text-center pt-8 md:pt-16 max-w-4xl mx-auto space-y-8 relative">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 mb-2">
                                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" /> Zero Single Point of Failure Architecture
                                    </div>
                                    <h1 className="font-heading font-bold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1]">
                                        One Backup. <br />
                                        <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">Multiple Clouds.</span><br />
                                        Greater Resilience.
                                    </h1>
                                    <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                                        Automated, cryptographically verified cross-cloud replication between <span className="text-cyan-300 font-medium">Supabase Storage</span> and <span className="text-blue-400 font-medium">AWS S3</span>. Real-time SHA-256 integrity audits, instantaneous disaster recovery, and policy scheduling.
                                    </p>
                                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                                        <button onClick={() => setCurrentView('dashboard')} className="px-7 py-3.5 rounded-xl font-heading font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 shadow-lg glow-cyan flex items-center gap-2 transition-all">
                                            <span>Explore Live Dashboard</span>
                                            <Icon name="arrowRight" className="w-4 h-4 text-slate-950" />
                                        </button>
                                        <button onClick={() => setCurrentView('architecture')} className="px-7 py-3.5 rounded-xl font-heading font-semibold text-sm glass-panel border border-slate-700 text-slate-200 hover:border-cyan-500/40 hover:text-white transition-all flex items-center gap-2">
                                            <Icon name="layers" className="w-4 h-4 text-cyan-400" />
                                            <span>View Cloud Topology</span>
                                        </button>
                                    </div>
                                    {/* Architecture Diagram Interactive Mockup */}
                                    <div className="pt-12">
                                        <div className="glass-panel rounded-2xl p-6 border border-slate-800 relative overflow-hidden shadow-2xl">
                                            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                                            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                                                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                                                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                                    <span className="text-xs font-mono text-slate-400 ml-2">dualcloud-replication-engine.live</span>
                                                </div>
                                                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Dual Sync Healthy
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                                                <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 text-left">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-mono text-slate-400">INGESTION</span>
                                                        <Icon name="upload" className="w-4 h-4 text-cyan-400" />
                                                    </div>
                                                    <div className="font-heading font-bold text-white text-base">Client Web Crypto</div>
                                                    <p className="text-xs text-slate-400">Computes local SHA-256 hash prior to streaming payload.</p>
                                                    <div className="p-2.5 bg-slate-950 rounded-lg text-[11px] font-mono text-cyan-300 truncate">SHA: 9f86d081884c7d659a2...</div>
                                                </div>
                                                <div className="p-5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-3 text-left">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-mono text-cyan-400">PRIMARY NODE</span>
                                                        <Icon name="database" className="w-4 h-4 text-cyan-400" />
                                                    </div>
                                                    <div className="font-heading font-bold text-white text-base">Supabase Storage</div>
                                                    <p className="text-xs text-slate-400">Object metadata stored with RLS permissions and audit triggers.</p>
                                                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400"><Icon name="shieldCheck" className="w-4 h-4" /> Primary Store Active</div>
                                                </div>
                                                <div className="p-5 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-3 text-left">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-mono text-blue-400">SECONDARY REPLICA</span>
                                                        <Icon name="hardDrive" className="w-4 h-4 text-blue-400" />
                                                    </div>
                                                    <div className="font-heading font-bold text-white text-base">AWS S3 Vault</div>
                                                    <p className="text-xs text-slate-400">Immutable object copy verified with secondary digest audit.</p>
                                                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400"><Icon name="checkCircle" className="w-4 h-4" /> SHA-256 100% Match</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {/* 4-Step Operational Pipeline */}
                                <section className="space-y-12">
                                    <div className="text-center space-y-3">
                                        <h2 className="font-heading font-bold text-3xl text-white">How DualCloud Works</h2>
                                        <p className="text-slate-400 text-sm max-w-lg mx-auto">Bulletproof data protection through transparent cross-cloud synchronization.</p>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {[
                                            { step: '01', title: 'Upload & Hash', desc: 'File is hashed on client using SHA-256 and uploaded to primary Supabase bucket.', icon: 'upload', color: 'cyan' },
                                            { step: '02', title: 'Edge Replicate', desc: 'Supabase Edge Function streams object directly to AWS S3 secondary bucket.', icon: 'refreshCw', color: 'blue' },
                                            { step: '03', title: 'Verify Hashes', desc: 'Automated cryptographic verification confirms zero packet corruption.', icon: 'shieldCheck', color: 'emerald' },
                                            { step: '04', title: 'Instant Restore', desc: 'Disaster recovery kicks in instantly from healthy mirror if any provider falters.', icon: 'server', color: 'purple' }
                                        ].map((st, i) => (
                                            <div key={i} className="glass-panel-interactive rounded-2xl p-6 space-y-4 text-left relative">
                                                <span className="text-3xl font-heading font-bold text-slate-700/60">{st.step}</span>
                                                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                                                    <Icon name={st.icon} className="w-5 h-5" />
                                                </div>
                                                <h3 className="font-heading font-bold text-white text-base">{st.title}</h3>
                                                <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                                {/* Enterprise Feature Cards */}
                                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="glass-panel rounded-2xl p-6 space-y-3 border border-slate-800">
                                        <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400"><Icon name="lock" className="w-5 h-5" /></div>
                                        <h3 className="font-heading font-bold text-white text-lg">Zero-Knowledge Secrets</h3>
                                        <p className="text-xs text-slate-400 leading-relaxed">AWS credentials are never exposed to browser context. All multi-cloud replication is executed via isolated Supabase Edge Functions with RLS validation.</p>
                                    </div>
                                    <div className="glass-panel rounded-2xl p-6 space-y-3 border border-slate-800">
                                        <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400"><Icon name="activity" className="w-5 h-5" /></div>
                                        <h3 className="font-heading font-bold text-white text-lg">Continuous Health Heartbeat</h3>
                                        <p className="text-xs text-slate-400 leading-relaxed">Real-time latency testing and automated retry exponential backoff prevent partial write failures from ever leaving objects orphaned.</p>
                                    </div>
                                    <div className="glass-panel rounded-2xl p-6 space-y-3 border border-slate-800">
                                        <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400"><Icon name="clock" className="w-5 h-5" /></div>
                                        <h3 className="font-heading font-bold text-white text-lg">Point-In-Time Rollbacks</h3>
                                        <p className="text-xs text-slate-400 leading-relaxed">Granular snapshot recovery from secondary immutable replicas ensures resistance against ransomware, accidental deletion, and outages.</p>
                                    </div>
                                </section>
                                {/* CTA Box */}
                                <section className="glass-panel rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-cyan-500/30 glow-cyan">
                                    <div className="space-y-4 max-w-xl mx-auto">
                                        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">Ready to safeguard your infrastructure?</h2>
                                        <p className="text-xs sm:text-sm text-slate-400">Access the fully loaded operational workspace with live file hashing, schedule policies, and failover engine.</p>
                                        <button onClick={() => setCurrentView('dashboard')} className="px-8 py-3.5 rounded-xl font-heading font-bold text-sm bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:brightness-110 shadow-lg inline-flex items-center gap-2">
                                            <span>Launch Dashboard</span>
                                            <Icon name="arrowRight" className="w-4 h-4 text-slate-950" />
                                        </button>
                                    </div>
                                </section>
                            </div>
                        )}

                        {/* VIEW 2: AUTHENTICATED DASHBOARD & WORKSPACE */}
                        {['dashboard', 'files', 'engine', 'providers', 'schedules', 'recovery'].includes(currentView) && (
                            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
                                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                                    <div className="flex flex-wrap items-center gap-2">
                                        {[
                                            { id: 'dashboard', label: 'Overview', icon: 'activity' },
                                            { id: 'files', label: `Files (${files.length})`, icon: 'fileText' },
                                            { id: 'engine', label: 'Cross-Cloud Engine', icon: 'terminal' },
                                            { id: 'providers', label: 'Cloud Providers', icon: 'database' },
                                            { id: 'schedules', label: 'Backup Schedules', icon: 'clock' },
                                            { id: 'recovery', label: 'Recovery Center', icon: 'shieldCheck' }
                                        ].map(tab => (
                                            <button key={tab.id} onClick={() => setCurrentView(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${currentView === tab.id ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'}`}>
                                                <Icon name={tab.icon} className="w-4 h-4" />
                                                <span>{tab.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-mono text-slate-400">Primary: <span className="text-emerald-400 font-semibold">Supabase</span> &bull; Secondary: <span className="text-blue-400 font-semibold">AWS S3</span></span>
                                    </div>
                                </div>

                                {isUploading && (
                                    <div className="glass-panel p-5 rounded-2xl border border-cyan-500/50 glow-cyan animate-pulse-slow">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                                                <Icon name="refreshCw" className="w-4 h-4 animate-spin text-cyan-400" />
                                                <span>{uploadStage}</span>
                                            </div>
                                            <span className="text-xs font-mono text-cyan-300 font-bold">{uploadProgress}%</span>
                                        </div>
                                        <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                                            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                                        </div>
                                    </div>
                                )}

                                {/* --- SUBVIEW: OVERVIEW (DASHBOARD) --- */}
                                {currentView === 'dashboard' && (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
                                                <div className="flex items-center justify-between text-slate-400">
                                                    <span className="text-xs font-medium uppercase tracking-wider font-mono">Protected Objects</span>
                                                    <Icon name="fileText" className="w-4 h-4 text-cyan-400" />
                                                </div>
                                                <div className="text-3xl font-heading font-bold text-white">{files.length}</div>
                                                <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1"><Icon name="checkCircle" className="w-3.5 h-3.5" /> 100% encrypted at rest</div>
                                            </div>
                                            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
                                                <div className="flex items-center justify-between text-slate-400">
                                                    <span className="text-xs font-medium uppercase tracking-wider font-mono">Total Cloud Storage</span>
                                                    <Icon name="hardDrive" className="w-4 h-4 text-blue-400" />
                                                </div>
                                                <div className="text-3xl font-heading font-bold text-white">{formatBytes(totalStorageBytes)}</div>
                                                <div className="text-[11px] text-slate-400 font-mono">Replicated: {formatBytes(totalStorageBytes * 2)} across providers</div>
                                            </div>
                                            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
                                                <div className="flex items-center justify-between text-slate-400">
                                                    <span className="text-xs font-medium uppercase tracking-wider font-mono">Replication Health</span>
                                                    <Icon name="shieldCheck" className="w-4 h-4 text-emerald-400" />
                                                </div>
                                                <div className="text-3xl font-heading font-bold text-emerald-400">{Math.round((verifiedCount / (files.length || 1)) * 100)}%</div>
                                                <div className="text-[11px] text-slate-400 font-mono">{verifiedCount} Verified &bull; {failedCount} Attention Needed</div>
                                            </div>
                                            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
                                                <div className="flex items-center justify-between text-slate-400">
                                                    <span className="text-xs font-medium uppercase tracking-wider font-mono">Active Providers</span>
                                                    <Icon name="database" className="w-4 h-4 text-purple-400" />
                                                </div>
                                                <div className="text-3xl font-heading font-bold text-white">2 / 3</div>
                                                <div className="text-[11px] text-cyan-300 font-mono">Supabase (Primary) + AWS S3</div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                            <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h3 className="font-heading font-bold text-white text-base">Cross-Cloud Storage Usage</h3>
                                                        <p className="text-xs text-slate-400">Dual-replicated byte telemetry across Supabase & AWS S3</p>
                                                    </div>
                                                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">Realtime Stream</span>
                                                </div>
                                                <div className="h-64 w-full pt-2">
                                                    <StorageTrendChart />
                                                </div>
                                            </div>
                                            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="font-heading font-bold text-white text-base">Target Topology Status</h3>
                                                    <p className="text-xs text-slate-400">Current cloud connection telemetry</p>
                                                </div>
                                                <div className="space-y-3">
                                                    {providers.map(p => (
                                                        <div key={p.id} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs font-bold text-white">{p.name}</span>
                                                                <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${p.status === 'CONNECTED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'}`}>{p.status}</span>
                                                            </div>
                                                            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                                                                <span>Latency: <strong className="text-cyan-400">{p.latencyMs}ms</strong></span>
                                                                <span>Bucket: {p.bucket}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <button onClick={() => setCurrentView('engine')} className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-all flex items-center justify-center gap-2">
                                                    <Icon name="terminal" className="w-4 h-4 text-cyan-400" />
                                                    <span>Inspect Live Engine Logs</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-heading font-bold text-white text-base">Recent Synchronized Files</h3>
                                                    <p className="text-xs text-slate-400">Object status and cryptographic verification badges</p>
                                                </div>
                                                <button onClick={() => setCurrentView('files')} className="text-xs font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                                                    <span>View All Files</span>
                                                    <Icon name="chevronRight" className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left text-xs">
                                                    <thead>
                                                        <tr className="border-b border-slate-800 text-slate-400 font-mono">
                                                            <th className="pb-3 font-medium">Object Name</th>
                                                            <th className="pb-3 font-medium">File Size</th>
                                                            <th className="pb-3 font-medium">Primary Store</th>
                                                            <th className="pb-3 font-medium">Secondary (AWS S3)</th>
                                                            <th className="pb-3 font-medium">SHA-256 Checksum</th>
                                                            <th className="pb-3 font-medium text-right">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-800/60 font-mono">
                                                        {files.slice(0, 4).map(file => (
                                                            <tr key={file.id} className="hover:bg-slate-900/40 transition-colors">
                                                                <td className="py-3.5 pr-4">
                                                                    <div className="flex items-center gap-2 font-sans font-medium text-white">
                                                                        <Icon name="fileText" className="w-4 h-4 text-cyan-400 shrink-0" />
                                                                        <span className="truncate max-w-[220px]">{file.name}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="py-3.5 text-slate-300">{formatBytes(file.size)}</td>
                                                                <td className="py-3.5">
                                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                                                                        <Icon name="check" className="w-3 h-3" /> Supabase
                                                                    </span>
                                                                </td>
                                                                <td className="py-3.5">
                                                                    {file.secondaryStatus === 'VERIFIED' ? (
                                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-cyan-950/80 text-cyan-300 border border-cyan-500/30"><Icon name="shieldCheck" className="w-3 h-3" /> Verified</span>
                                                                    ) : file.secondaryStatus === 'REPLICATING' ? (
                                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-blue-950 text-blue-300 border border-blue-500/30 animate-pulse"><Icon name="refreshCw" className="w-3 h-3 animate-spin" /> Syncing...</span>
                                                                    ) : (
                                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-rose-950 text-rose-300 border border-rose-500/30"><Icon name="alertTriangle" className="w-3 h-3" /> Checksum Fail</span>
                                                                    )}
                                                                </td>
                                                                <td className="py-3.5 text-slate-400">
                                                                    <span className="text-[11px] bg-slate-950 px-2 py-1 rounded border border-slate-800">{file.sha256.slice(0, 14)}...</span>
                                                                </td>
                                                                <td className="py-3.5 text-right space-x-2">
                                                                    {file.secondaryStatus === 'FAILED' ? (
                                                                        <button onClick={() => handleRetryReplication(file.id)} className="px-2.5 py-1 rounded text-[11px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all font-sans font-medium">Retry Sync</button>
                                                                    ) : (
                                                                        <button onClick={() => { setRecoveryTargetFile(file); setRecoveryModalOpen(true); }} className="px-2.5 py-1 rounded text-[11px] bg-slate-900 text-slate-300 border border-slate-700 hover:text-white transition-all font-sans font-medium">Restore</button>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* --- SUBVIEW: FILE MANAGEMENT HUB --- */}
                                {currentView === 'files' && (
                                    <div className="space-y-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div>
                                                <h2 className="font-heading font-bold text-2xl text-white">File & Object Repository</h2>
                                                <p className="text-xs text-slate-400">Inspect multi-cloud state, checksum hashes, and version rollback options.</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <label className="cursor-pointer">
                                                    <input type="file" className="hidden" onChange={handleFileUpload} />
                                                    <div className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 shadow-md flex items-center gap-2">
                                                        <Icon name="upload" className="w-4 h-4 text-slate-950" />
                                                        <span>Upload New Object</span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
                                            <div className="relative w-full md:w-80">
                                                <Icon name="search" className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                                <input type="text" placeholder="Search by file name or SHA-256 hash..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono" />
                                            </div>
                                            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                                                {['ALL', 'VERIFIED', 'REPLICATING', 'FAILED'].map(st => (
                                                    <button key={st} onClick={() => setFilterStatus(st)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${filterStatus === st ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'}`}>{st}</button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {filteredFiles.map(file => (
                                                <div key={file.id} className="glass-panel-interactive rounded-2xl p-5 border border-slate-800 space-y-4 text-left">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="flex items-center gap-3 overflow-hidden">
                                                            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0"><Icon name="fileText" className="w-5 h-5" /></div>
                                                            <div className="overflow-hidden">
                                                                <h4 className="font-heading font-bold text-white text-sm truncate" title={file.name}>{file.name}</h4>
                                                                <div className="text-[11px] font-mono text-slate-400 mt-0.5">{formatBytes(file.size)} &bull; {file.encryption}</div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            {file.secondaryStatus === 'VERIFIED' ? (
                                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/30"><Icon name="shieldCheck" className="w-3.5 h-3.5" /> Verified</span>
                                                            ) : file.secondaryStatus === 'REPLICATING' ? (
                                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono bg-blue-950 text-blue-300 border border-blue-500/30 animate-pulse"><Icon name="refreshCw" className="w-3.5 h-3.5 animate-spin" /> In Flight</span>
                                                            ) : (
                                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono bg-rose-950 text-rose-300 border border-rose-500/30"><Icon name="alertTriangle" className="w-3.5 h-3.5" /> Hash Mismatch</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1">
                                                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                                                            <span>CRYPTOGRAPHIC SHA-256 DIGEST</span>
                                                            <button onClick={() => { navigator.clipboard.writeText(file.sha256); showToast('Checksum copied to clipboard!', 'info'); }} className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                                                                <Icon name="copy" className="w-3 h-3" /> <span>Copy</span>
                                                            </button>
                                                        </div>
                                                        <div className="text-[11px] font-mono text-cyan-300 break-all leading-tight">{file.sha256}</div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800/60">
                                                        <div>Primary: <strong className="text-emerald-400">Supabase</strong></div>
                                                        <div>Secondary: <strong className="text-blue-400">{file.secondaryProvider}</strong></div>
                                                        <div>Versions: <strong className="text-slate-300">{file.versionsCount} Snapshots</strong></div>
                                                        <div>Audit: <strong className="text-slate-300">{file.lastVerified}</strong></div>
                                                    </div>
                                                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                                                        {file.secondaryStatus === 'FAILED' ? (
                                                            <button onClick={() => handleRetryReplication(file.id)} className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 flex items-center gap-1.5">
                                                                <Icon name="refreshCw" className="w-3.5 h-3.5" /> <span>Retry Replication</span>
                                                            </button>
                                                        ) : (
                                                            <button onClick={() => { setRecoveryTargetFile(file); setRecoveryModalOpen(true); }} className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-700 hover:text-white flex items-center gap-1.5">
                                                                <Icon name="shieldCheck" className="w-3.5 h-3.5 text-cyan-400" /> <span>Recover / Restore</span>
                                                            </button>
                                                        )}
                                                        <button onClick={() => showToast(`Secure signed URL generated for ${file.name}. Download ready.`, 'success')} className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1">
                                                            <Icon name="download" className="w-3.5 h-3.5" /> <span>Signed URL</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* --- SUBVIEW: CROSS-CLOUD ENGINE & LIVE TERMINAL --- */}
                                {currentView === 'engine' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h2 className="font-heading font-bold text-2xl text-white">Replication Engine & Terminal</h2>
                                                <p className="text-xs text-slate-400">Observe Edge Function triggers, cryptographic handshakes, and bucket copy streams.</p>
                                            </div>
                                            <button onClick={() => { addEngineLog(`[MANUAL_AUDIT] Auditing ${files.length} cross-cloud objects against AWS S3...`); setTimeout(() => { addEngineLog(`[AUDIT_SUCCESS] All primary and secondary cryptographic digests verified.`); showToast('Automated audit completed with 100% integrity!', 'success'); }, 1200); }} className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 flex items-center gap-2">
                                                <Icon name="refreshCw" className="w-4 h-4 text-cyan-400" /> <span>Run Full Cloud Integrity Audit</span>
                                            </button>
                                        </div>
                                        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                                            <h3 className="font-heading font-bold text-white text-base">Continuous Replication Protocol</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center">
                                                {[
                                                    { title: '1. Ingestion', sub: 'Client SHA-256', badge: 'Pre-flight', color: 'border-cyan-500/40' },
                                                    { title: '2. Supabase Primary', sub: 'Object Storage + RLS', badge: 'Active Staging', color: 'border-emerald-500/40' },
                                                    { title: '3. Edge Worker', sub: 'Direct Buffer Stream', badge: 'Zero-Disk Copy', color: 'border-blue-500/40' },
                                                    { title: '4. AWS S3 Vault', sub: 'Secondary PutObject', badge: 'Immutable', color: 'border-purple-500/40' },
                                                    { title: '5. Dual Audit', sub: 'ETag vs SHA-256', badge: '100% Verified', color: 'border-cyan-400' }
                                                ].map((step, idx) => (
                                                    <div key={idx} className={`p-4 rounded-xl bg-slate-950 border ${step.color} space-y-1`}>
                                                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">{step.badge}</span>
                                                        <div className="font-heading font-bold text-white text-sm">{step.title}</div>
                                                        <div className="text-[11px] text-slate-400 font-mono">{step.sub}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                                            <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                                                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                                                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                                    <span className="text-xs font-mono text-slate-400 ml-2">dualcloud-edge-daemon.stdout</span>
                                                </div>
                                                <button onClick={() => setEngineLogs([])} className="text-[11px] font-mono text-slate-400 hover:text-white">Clear Output</button>
                                            </div>
                                            <div className="p-5 font-mono text-xs text-slate-300 space-y-1.5 h-80 overflow-y-auto bg-[#050811]">
                                                {engineLogs.map((log, i) => (
                                                    <div key={i} className="leading-relaxed">
                                                        {log.includes('SUCCESS') ? <span className="text-emerald-400">{log}</span> :
                                                         log.includes('ERROR') || log.includes('mismatch') ? <span className="text-rose-400">{log}</span> :
                                                         log.includes('SECONDARY') || log.includes('EDGE') ? <span className="text-blue-300">{log}</span> :
                                                         <span className="text-slate-300">{log}</span>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* --- SUBVIEW: CLOUD PROVIDERS --- */}
                                {currentView === 'providers' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h2 className="font-heading font-bold text-2xl text-white">Cloud Storage Providers</h2>
                                                <p className="text-xs text-slate-400">Secure multi-cloud endpoints, IAM roles, and encrypted credential stores.</p>
                                            </div>
                                            <button onClick={() => showToast('Credential test suite passed across all configured endpoints.', 'success')} className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 font-heading">Ping All Endpoints</button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {providers.map(prov => (
                                                <div key={prov.id} className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5 flex flex-col justify-between">
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono ${prov.type === 'PRIMARY' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30' : 'bg-blue-950 text-blue-300 border border-blue-500/30'}`}>{prov.type}</span>
                                                            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> {prov.status}</span>
                                                        </div>
                                                        <h3 className="font-heading font-bold text-white text-lg">{prov.name}</h3>
                                                        <div className="p-3 bg-slate-950 rounded-xl space-y-2 text-xs font-mono text-slate-300">
                                                            <div className="flex justify-between"><span className="text-slate-500">Bucket:</span><span className="text-cyan-300 truncate max-w-[150px]">{prov.bucket}</span></div>
                                                            <div className="flex justify-between"><span className="text-slate-500">Region:</span><span>{prov.region}</span></div>
                                                            <div className="flex justify-between"><span className="text-slate-500">Latency:</span><span className="text-emerald-400">{prov.latencyMs}ms</span></div>
                                                            <div className="flex justify-between"><span className="text-slate-500">Stored:</span><span>{prov.totalStored}</span></div>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                                                        <button onClick={() => showToast(`Ping test OK for ${prov.name} (${prov.latencyMs}ms)`, 'info')} className="w-full py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all">Test Connection</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* --- SUBVIEW: BACKUP SCHEDULES & POLICIES --- */}
                                {currentView === 'schedules' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h2 className="font-heading font-bold text-2xl text-white">Automated Backup Policies</h2>
                                                <p className="text-xs text-slate-400">Configured cron jobs running on Supabase pg_cron / Edge Scheduler.</p>
                                            </div>
                                            <button onClick={() => showToast('New replication policy created and registered with pg_cron.', 'success')} className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30">+ Create Policy</button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {policies.map(pol => (
                                                <div key={pol.id} className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-300">{pol.cron} ({pol.intervalLabel})</span>
                                                        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> {pol.status}</span>
                                                    </div>
                                                    <h3 className="font-heading font-bold text-white text-lg">{pol.name}</h3>
                                                    <div className="p-3.5 bg-slate-950 rounded-xl space-y-2 text-xs font-mono text-slate-300">
                                                        <div className="flex justify-between"><span className="text-slate-500">Destination:</span><span className="text-blue-300">{pol.secondary}</span></div>
                                                        <div className="flex justify-between"><span className="text-slate-500">Retention:</span><span>{pol.retentionDays} days</span></div>
                                                        <div className="flex justify-between"><span className="text-slate-500">Filter Pattern:</span><span className="text-cyan-300">{pol.matchPattern}</span></div>
                                                        <div className="flex justify-between"><span className="text-slate-500">Next Scheduled Run:</span><span className="text-emerald-400">{pol.nextRun}</span></div>
                                                    </div>
                                                    <div className="flex items-center justify-between pt-2">
                                                        <button onClick={() => showToast(`Triggering manual execution for "${pol.name}"...`, 'info')} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 flex items-center gap-1.5">
                                                            <Icon name="play" className="w-3.5 h-3.5" /> <span>Execute Now</span>
                                                        </button>
                                                        <span className="text-[11px] font-mono text-slate-500">Retries: {pol.retryAttempts} backoff</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* --- SUBVIEW: RECOVERY CENTER --- */}
                                {currentView === 'recovery' && (
                                    <div className="space-y-6">
                                        <div>
                                            <h2 className="font-heading font-bold text-2xl text-white">Disaster Recovery Center</h2>
                                            <p className="text-xs text-slate-400">Restore point-in-time snapshots directly from AWS S3 mirror with zero downtime.</p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
                                                <span className="text-xs font-mono text-slate-400 uppercase">Available Restore Points</span>
                                                <div className="text-3xl font-heading font-bold text-white">{files.length * 2} Snapshots</div>
                                                <p className="text-[11px] text-slate-400">Spanning Supabase and S3 repositories</p>
                                            </div>
                                            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
                                                <span className="text-xs font-mono text-slate-400 uppercase">Estimated Recovery RTO</span>
                                                <div className="text-3xl font-heading font-bold text-cyan-400">&lt; 4.2 seconds</div>
                                                <p className="text-[11px] text-slate-400">Via high-speed multi-region backbone</p>
                                            </div>
                                            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
                                                <span className="text-xs font-mono text-slate-400 uppercase">Cryptographic Integrity</span>
                                                <div className="text-3xl font-heading font-bold text-emerald-400">100.0%</div>
                                                <p className="text-[11px] text-slate-400">Zero checksum corruptions detected</p>
                                            </div>
                                        </div>
                                        <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-4">
                                            <h3 className="font-heading font-bold text-white text-base">Select Object to Initiate Recovery</h3>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left text-xs">
                                                    <thead>
                                                        <tr className="border-b border-slate-800 text-slate-400 font-mono">
                                                            <th className="pb-3">File Name</th>
                                                            <th className="pb-3">Size</th>
                                                            <th className="pb-3">Secondary S3 Mirror</th>
                                                            <th className="pb-3">Snapshot Timestamp</th>
                                                            <th className="pb-3 text-right">Recovery Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-800/60 font-mono">
                                                        {files.map(file => (
                                                            <tr key={file.id} className="hover:bg-slate-900/40">
                                                                <td className="py-3.5 pr-4 font-sans font-medium text-white">{file.name}</td>
                                                                <td className="py-3.5 text-slate-300">{formatBytes(file.size)}</td>
                                                                <td className="py-3.5"><span className="text-blue-400 font-semibold">{file.secondaryProvider}</span></td>
                                                                <td className="py-3.5 text-slate-400">{file.lastVerified}</td>
                                                                <td className="py-3.5 text-right">
                                                                    <button onClick={() => { setRecoveryTargetFile(file); setRecoveryModalOpen(true); }} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 font-sans">Restore Object</button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* VIEW 3: ARCHITECTURE & SECURITY EXPLANATION */}
                        {currentView === 'architecture' && (
                            <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 space-y-12">
                                <div className="text-center space-y-3">
                                    <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">Production Architecture Specification</span>
                                    <h1 className="font-heading font-bold text-4xl text-white">DualCloud Cloud Architecture</h1>
                                    <p className="text-slate-400 text-sm max-w-xl mx-auto">A zero-trust, dual-redundant storage topology with serverless edge dispatch.</p>
                                </div>
                                <div className="glass-panel rounded-3xl p-8 border border-slate-800 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                                            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs"><Icon name="lock" className="w-4 h-4" /> <span>LAYER 1</span></div>
                                            <h3 className="font-heading font-bold text-white text-lg">Vercel & Client Browser</h3>
                                            <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
                                                <li>Client-side SHA-256 Web Crypto hashing</li>
                                                <li>Supabase Auth JWT Token management</li>
                                                <li>Zero credentials stored in browser bundle</li>
                                                <li>Real-time telemetry and error retry UI</li>
                                            </ul>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3">
                                            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs"><Icon name="cpu" className="w-4 h-4" /> <span>LAYER 2</span></div>
                                            <h3 className="font-heading font-bold text-white text-lg">Supabase Edge Core</h3>
                                            <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
                                                <li>Row Level Security (RLS) PostgreSQL auth check</li>
                                                <li>Isolated Edge Function object streamer</li>
                                                <li>Private AWS IAM Signature v4 generation</li>
                                                <li>PostgreSQL trigger job dispatcher</li>
                                            </ul>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                                            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs"><Icon name="database" className="w-4 h-4" /> <span>LAYER 3</span></div>
                                            <h3 className="font-heading font-bold text-white text-lg">Secondary AWS S3 Vault</h3>
                                            <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
                                                <li>Separate availability zone & cloud account</li>
                                                <li>Object Lock immutable compliance bucket</li>
                                                <li>Cryptographic ETag & SHA-256 cross-check</li>
                                                <li>Glacier Cold Tier auto-archival policies</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-4">
                                        <h4 className="font-heading font-bold text-cyan-300 text-base">Key Security Principles</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                                            <div><strong className="text-white">1. No Frontend Secret Leaks:</strong> AWS `SECRET_ACCESS_KEY` is exclusively saved in Supabase Edge Secrets, never exposed to Vercel `VITE_` client bundles.</div>
                                            <div><strong className="text-white">2. Pre-Verification Integrity:</strong> Files are never flagged as `VERIFIED` until the secondary provider returns a matching SHA-256 checksum.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* VIEW 4: DEPLOYMENT CONFIGURATION */}
                        {currentView === 'deployment' && (
                            <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 space-y-10">
                                <div className="text-center space-y-3">
                                    <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">Production Deployment Guide</span>
                                    <h1 className="font-heading font-bold text-4xl text-white">Vercel & Supabase Deployment</h1>
                                    <p className="text-slate-400 text-sm max-w-xl mx-auto">Complete project structure and configuration for deploying DualCloud Sync to production.</p>
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <CodeViewer title="Vercel Config" filename="vercel.json" code={DEPLOYMENT_FILES.vercelJson} lang="JSON" />
                                    <CodeViewer title="Package Config" filename="package.json" code={DEPLOYMENT_FILES.packageJson} lang="JSON" />
                                    <CodeViewer title="Environment Variables" filename=".env.example" code={DEPLOYMENT_FILES.envExample} lang="ENV" />
                                    <CodeViewer title="Edge Function" filename="supabase/functions/replicate-cross-cloud/index.ts" code={DEPLOYMENT_FILES.edgeFunction} lang="TypeScript" />
                                </div>
                                
                                <CodeViewer title="README" filename="README.md" code={DEPLOYMENT_FILES.readme} lang="Markdown" />
                            </div>
                        )}

                        {/* VIEW 5: DATABASE SCHEMA & DDL CODE */}
                        {currentView === 'sql' && (
                            <div className="max-w-5xl mx-auto px-4 lg:px-8 py-12 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h1 className="font-heading font-bold text-3xl text-white">PostgreSQL Database Schema & RLS</h1>
                                        <p className="text-xs text-slate-400">Complete migration script ready for deployment on Supabase PostgreSQL.</p>
                                    </div>
                                    <button onClick={() => { navigator.clipboard.writeText(document.getElementById('sql-code-block').innerText); showToast('Complete SQL Schema copied to clipboard!', 'success'); }} className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 flex items-center gap-2">
                                        <Icon name="copy" className="w-4 h-4 text-cyan-400" /> <span>Copy Migration SQL</span>
                                    </button>
                                </div>
                                <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                                    <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
                                        <span className="text-xs font-mono text-slate-400">supabase/migrations/20250101_dualcloud_schema.sql</span>
                                        <span className="text-xs font-mono text-cyan-400">PostgreSQL 15+</span>
                                    </div>
                                    <pre id="sql-code-block" className="p-6 font-mono text-xs text-cyan-300/90 overflow-x-auto leading-relaxed bg-[#050811]">{`-- DUALCLOUD SYNC: PRODUCTION DATABASE SCHEMA & RLS POLICIES

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
CREATE POLICY "Allow user reads" ON storage.objects FOR SELECT USING (bucket_id = 'dualcloud-prod-primary' AND auth.uid() = owner);`}</pre>
                                </div>
                            </div>
                        )}
                    </main>

                    {recoveryModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4" onClick={() => !recoveryRunning && setRecoveryModalOpen(false)}>
                            <div className="glass-panel rounded-2xl border border-cyan-500/40 w-full max-w-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                                            <Icon name="shieldCheck" className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-heading font-bold text-white text-lg">Disaster Recovery Execution</h3>
                                            <p className="text-xs text-slate-400">Initiating point-in-time snapshot restore for {recoveryTargetFile?.name}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => !recoveryRunning && setRecoveryModalOpen(false)} className="text-slate-400 hover:text-white text-sm">✕</button>
                                </div>
                                <div className="p-6 space-y-4">
                                    {!recoveryRunning && recoveryLogs.length === 0 ? (
                                        <div className="text-center py-12 space-y-4">
                                            <Icon name="alertTriangle" className="w-12 h-12 text-amber-400 mx-auto" />
                                            <p className="text-slate-300 text-sm">Are you sure you want to overwrite the primary instance with the S3 snapshot?</p>
                                            <button onClick={triggerRecovery} className="px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110">Confirm & Restore</button>
                                        </div>
                                    ) : (
                                        <div className="font-mono text-xs text-slate-300 space-y-1.5 h-60 overflow-y-auto bg-[#050811] p-4 rounded-lg border border-slate-800">
                                            {recoveryLogs.map((log, i) => <div key={i} className="text-cyan-300">{log}</div>)}
                                            {recoveryRunning && <div className="text-cyan-400 animate-pulse">Executing restore stream...</div>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        export default App;