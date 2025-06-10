# SOMINDO TASK

Simple website dibangun dengan Next.js, TailwindCSS, dan TypeScript untuk memberikan tugas kepada pengguna dan memberi mereka imbalan berupa role di server Discord.

## Fitur Utama
- **Login dengan Discord**: Integrasi penuh menggunakan `next-auth`.
- **Sistem Task**: Pengguna harus menyelesaikan serangkaian tugas (seperti Follow Twitter, Retweet, dll).
- **Klaim Role Otomatis**: Setelah semua tugas selesai, pengguna dapat mengklaim role Discord melalui panggilan API ke Bot Anda.
- **UI Modern & Responsif**: Dibangun dengan TailwindCSS dan animasi dari Framer Motion.
- **Notifikasi Toast**: Umpan balik instan untuk aksi pengguna (sukses/gagal) menggunakan `react-hot-toast`.
- **Database MongoDB**: Dikelola dengan Prisma ORM untuk fleksibilitas dan keamanan tipe.

## Prasyarat
- [Node.js](https://nodejs.org/) (v18 atau lebih baru)
- [pnpm](https://pnpm.io/installation) (atau npm/yarn)
- Akun [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Akun Developer [Discord](https://discord.com/developers/applications)

## Cara Setup Proyek

### 1. Clone Repositori
```bash
git clone https://github.com/lrmn7/somindo-task.git
cd somindo-task
```

### 2. Install Dependensi
```bash
pnpm install
# atau
npm install
```

### 3. Konfigurasi Environment Variables
Salin file `.env.example` menjadi file baru bernama `.env.local`:
```bash
cp .env.example .env.local
```
Buka file `.env.local` dan isi semua variabel yang dibutuhkan:
- `DATABASE_URL`: URL koneksi ke database MongoDB Atlas Anda.
- `DISCORD_CLIENT_ID` & `DISCORD_CLIENT_SECRET`: Dapatkan dari halaman "OAuth2" di aplikasi Discord Developer Anda. Jangan lupa tambahkan `http://localhost:3000/api/auth/callback/discord` sebagai Redirect URI.
- `DISCORD_GUILD_ID`: ID server Discord Anda.
- `DISCORD_PREREQUISITE_ROLE_ID` ID Role untuk mengindentifikasi pengguna sudah bergabung di server dan verifikasi
- `DISCORD_REWARD_ROLE_ID`: ID Role Discord untuk memberikan reward
- `DISCORD_BOT_TOKEN`: Token dari halaman "Bot" di aplikasi Discord Developer Anda. Pastikan bot memiliki izin `Manage Roles` dan telah diundang ke server Anda.
- `NEXTAUTH_SECRET`: Kunci rahasia untuk `next-auth`. Anda bisa membuatnya dengan menjalankan perintah `openssl rand -base64 32` di terminal.
- `NEXTAUTH_URL`: Atur ke `http://localhost:3000` untuk development.

### 4. Sinkronisasi Database
Jalankan perintah berikut untuk menyinkronkan skema Prisma Anda dengan database MongoDB. Ini akan membuat collection yang dibutuhkan.
```bash
npx prisma db push
```

### 5. Jalankan Aplikasi
```bash
pnpm dev
# atau
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

## Hosting
Untuk melakukan deployment ke produksi (misalnya di Vercel, Netlify, atau Railway):
1.  Pastikan repositori Anda terhubung dengan platform hosting pilihan Anda.
2.  Atur semua Environment Variables yang ada di `.env.local` ke dalam pengaturan environment di platform hosting.
3.  Ubah `NEXTAUTH_URL` menjadi URL domain produksi Anda (misalnya, `https://your-app.vercel.app`).
4.  Pastikan Build Command diatur ke `next build` dan `prisma generate` dijalankan sebelum build (bisa ditambahkan ke `postinstall` script di `package.json` seperti yang sudah ada).
5.  Deploy!