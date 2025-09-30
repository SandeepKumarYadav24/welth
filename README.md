# Welth

A personal finance & transaction management web app built with Next.js. It enables users to connect their accounts, track spending, and scan receipts using OCR to automate transaction entry.

---

## 🛠️ Tech Stack

* **Frontend**: Next.js (App Router), JavaScript
* **Database**: PostgreSQL (via Supabase)
* **ORM**: Prisma
* **Authentication / User Management**: Clerk
* **Security / Request Protection**: Arcjet
* **Job Scheduling / Background Tasks**: Inngest
* **OCR Engine**: Gemini 2.5 Flash (for receipt scanning)
* **Styling / UI**: Tailwind CSS, ShadCN UI
* **API / Backend**: Next.js server functions, REST endpoints

---

## 🚀 Features

* Full‑stack architecture: Next.js frontend + backend APIs
* Secure user registration / login via custom OAuth + JWT session management
* CRUD operations for accounts, transactions, and categories
* Automated receipt scanning: upload receipt image → extract transaction details via OCR
* Recurring / scheduled jobs via Inngest (cleanup, sync, reminders)
* Rate-limiting / protection via Arcjet
* Responsive and polished UI with Tailwind CSS
* Resend mail service integration using React mail templates

---

## 🧩 Setup & Running Locally

1. Clone the repo:

   ```bash
   git clone https://github.com/SandeepKumarYadav24/welth.git
   cd welth
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create and populate `.env.local` with required environment variables. Example variables might include:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
NEXT_PUBLIC_CLERK_FRONTEND_API=""
NEXT_PUBLIC_CLERK_SIGN_IN_URL=sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=sign-up
DATABASE_URL=""
DIRECT_URL=""
ARCJET_KEY=""
RESEND_API_KEY=""
GEMINI_API_KEY=""
```

4. Run migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✅ Usage

* **Sign up / Login**: Use custom OAuth for Google or GitHub
* **Add Accounts / Categories**: Create financial accounts and classify spending
* **Upload Receipt**: Users can upload an image of a receipt; the app uses **Gemini 2.5 Flash OCR** to parse transaction data
* **View & Manage Transactions**: Edit, delete, or review automatic entries
* **Recurring Jobs**: Scheduled background tasks run using Inngest (for cleanups, reminders, etc.)

---

## 🛡️ Security & Best Practices

* All APIs are protected via JWT session tokens
* Custom OAuth flows built securely (token exchange, refresh logic, CSRF protections)
* Rate-limiting and abuse protection are handled by Arcjet
* Sensitive keys and credentials are stored in environment variables, never committed

---

## 📄 License

[MIT](LICENSE)

---

## 🙌 Contributions & Feedback

Contributions, issues, and feature requests are welcome!
Feel free to open an issue or submit a pull request.
