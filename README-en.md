# **SOMINDO TASK**

A simple website built with **Next.js, TailwindCSS, and TypeScript** to assign tasks to users and reward them with **Discord roles**.

---

## **Key Features**

* **Discord Login**: Full integration using `next-auth`.
* **Task System**: Users must complete a series of tasks (such as Follow Twitter, Retweet, etc.).
* **Automatic Role Claiming**: After completing all tasks, users can claim their Discord role through an API call to your bot.
* **Modern & Responsive UI**: Built with TailwindCSS and enhanced with Framer Motion animations.
* **Toast Notifications**: Instant feedback for user actions (success/failure) using `react-hot-toast`.
* **MongoDB Database**: Managed with Prisma ORM for flexibility and type safety.

---

## **Prerequisites**

* [Node.js](https://nodejs.org/) (v18 or newer)
* [pnpm](https://pnpm.io/installation) (or npm/yarn)
* A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
* A [Discord Developer](https://discord.com/developers/applications) account

---

## **Project Setup Guide**

### **1. Clone the Repository**

```bash
git clone https://github.com/lrmn7/somindo-task.git
cd somindo-task
```

---

### **2. Install Dependencies**

```bash
pnpm install
# or
npm install
```

---

### **3. Configure Environment Variables**

Copy `.env.example` to a new file named `.env.local`:

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in all required variables:

* `DATABASE_URL`: Your MongoDB Atlas connection URL
* `DISCORD_CLIENT_ID` & `DISCORD_CLIENT_SECRET`: Obtain from the Discord Developer Portal under **OAuth2**

  * Add `http://localhost:3000/api/auth/callback/discord` as a Redirect URI
* `DISCORD_GUILD_ID`: Your Discord server ID
* `DISCORD_PREREQUISITE_ROLE_ID`: Role ID used to verify users who have joined the server
* `DISCORD_REWARD_ROLE_ID`: Discord role ID for task rewards
* `DISCORD_BOT_TOKEN`: Bot token from the **Bot** section in Discord Developer Portal

  * Ensure the bot has **Manage Roles** permission and has been invited to the server
* `NEXTAUTH_SECRET`: Secret key for `next-auth`

  * Generate with:

    ```bash
    openssl rand -base64 32
    ```
* `NEXTAUTH_URL`: Set to `http://localhost:3000` for development

---

### **4. Sync Database**

Run the following command to sync your Prisma schema with MongoDB:

```bash
npx prisma db push
```

This will create the required collections.

---

### **5. Run the Application**

```bash
pnpm dev
# or
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the app.

---

## **Deployment / Hosting**

To deploy to production (e.g., **Vercel**, **Netlify**, or **Railway**):

1. Connect your repository to your hosting platform
2. Add all environment variables from `.env.local` to your hosting environment settings
3. Update `NEXTAUTH_URL` to your production domain

   * Example: `https://your-app.vercel.app`
4. Ensure the build command runs `next build` and `prisma generate`

   * This can be added to `postinstall` in `package.json`
5. Deploy 🎉

---