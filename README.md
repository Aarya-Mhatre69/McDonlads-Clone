# McDonald Clone 🍔

A modern **McDonald’s-inspired food ordering web application** built using **Next.js**, **React**, and **TypeScript**.  
This project replicates a fast-food ordering experience with dynamic menus, outlet browsing, coupons, filtering, and responsive UI components.

---

# 🚀 Features

- 🍟 Modern McDonald-inspired UI
- 📍 Outlet listing & location browsing
- 🎟️ Coupon & offers section
- 🔍 Menu filtering and category navigation
- 🛒 Dynamic menu cards
- ⚡ Fast rendering with Next.js
- 🎨 Responsive design with Tailwind CSS
- 🧩 Reusable React components
- 🌙 Clean project architecture

---

# 🛠️ Tech Stack

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend
- Node.js backend services (inside `/backend`)

## Tooling
- ESLint
- PostCSS
- VS Code

---

# 📂 Project Structure

```bash
McDonald/
│
├── app/                  # Next.js app directory
├── backend/              # Backend services / APIs
├── components/           # Reusable UI components
│   ├── CouponSection.tsx
│   ├── CursorFX.tsx
│   ├── FilterBar.tsx
│   ├── LocationBar.tsx
│   ├── MenuCard.tsx
│   ├── MenuList.tsx
│   ├── Navbar.tsx
│   ├── OutletCard.tsx
│   └── OutletList.tsx
│
├── context/              # React Context APIs
├── data/                 # Static/mock data
├── lib/                  # Utility functions
├── public/               # Public assets
│
├── .env.local            # Environment variables
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

# ⚙️ Installation & Local Setup

## 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
cd McDonald
```

---

## 2️⃣ Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env.local` file in the root directory.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Add all required environment variables depending on your backend configuration.

---

## 4️⃣ Run the Development Server

### Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

---

### Backend (if applicable)

Navigate to backend folder:

```bash
cd backend
npm install
npm start
```

Backend typically runs on:

```bash
http://localhost:5000
```

---

# 🧪 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

# 🌐 Future Improvements

- 🔐 Authentication system
- 🛒 Cart & checkout
- 💳 Payment gateway integration
- 📦 Order tracking
- 🌍 Real backend/database integration
- 📱 Progressive Web App (PWA)

---

# 🤝 Contributing

Contributions are welcome.

## Steps:

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push to branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📄 License

This project is for educational and portfolio purposes.

---

# 👨‍💻 Author

Developed with ❤️ using Next.js and TypeScript.