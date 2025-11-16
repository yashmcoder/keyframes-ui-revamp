# Keyframe Studios - Frontend

React + TypeScript + Vite frontend for Keyframe Studios website.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Visit `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Output will be in the `dist/` directory.

## 🌐 Deployment (Cloudflare Pages)

### Build Settings
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** 18 or higher

### Environment Variables
Set the following in Cloudflare Pages:
- `VITE_API_URL` - Your backend API URL (e.g., `https://your-backend.railway.app`)

## 📁 Project Structure
```
frontend/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── App.tsx        # Main app component
│   └── main.tsx       # Entry point
├── public/            # Static assets
│   └── _redirects     # SPA routing for Cloudflare Pages
└── index.html         # HTML template
```

## 🎨 Tech Stack
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
