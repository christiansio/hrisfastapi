# React + Vite + Tailwind CSS Setup Guide

## Project Structure (Recommended)

```
your-project/
├── backend/           # FastAPI or other backend code
│   ├── main.py
│   └── requirements.txt
│
├── frontend/          # React + Vite application
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   └── app.css
│   ├── package.json
│   ├── postcss.config.js
│   ├── vite.config.ts
│   └── node_modules/
│
└── package.json       # Optional: root package.json for scripts
```

---

## Installation Steps

### 1. Create React + Vite Project

```bash
cd your-project
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
```

### 2. Install Tailwind CSS v4

```bash
npm install tailwindcss @tailwindcss/postcss
npm install -D autoprefixer
```

### 3. Configure PostCSS

Create or update `postcss.config.js` in the `frontend/` directory:

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### 4. Import Tailwind in CSS

Add Tailwind import at the **very top** of `src/app.css`:

```css
@import "tailwindcss";

/* Your existing CSS below */
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
```

### 5. Ensure CSS is Imported in Entry Point

Verify `src/main.tsx` imports your CSS file:

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './app.css'  // ← Must be present

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 6. Start Development Server

```bash
npm run dev
```

---

## Testing Tailwind

Replace `src/App.tsx` content with:

```typescript
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600">
        Tailwind CSS is working! 🎉
      </h1>
    </div>
  )
}
```

If the text appears large, blue, and centered on a gray background → **Tailwind is working correctly**.

---

## Common Issues & Solutions

### Issue: Tailwind classes not applying

**Solution:**
1. Verify `@import "tailwindcss";` is at the top of `app.css`
2. Confirm `app.css` is imported in `main.tsx`
3. Check `postcss.config.js` exists with correct plugins
4. Restart dev server with `npm run dev`

### Issue: Module not found errors

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: Old Tailwind v3 configuration

**Solution:**
- Tailwind v4 uses `@import` instead of `@tailwind` directives
- No `tailwind.config.js` needed for v4
- Use PostCSS plugin `@tailwindcss/postcss`

---

## Running Backend + Frontend Together

### Development Mode

**Terminal 1 (Backend):**
```bash
cd backend
python main.py  # or uvicorn main:app --reload
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### Production Build

```bash
cd frontend
npm run build
# Output in frontend/dist/
```

---

## Package Scripts (Optional Root Setup)

Create `package.json` in project root for convenience:

```json
{
  "name": "your-project",
  "scripts": {
    "dev:frontend": "cd frontend && npm run dev",
    "dev:backend": "cd backend && python main.py",
    "build:frontend": "cd frontend && npm run build",
    "install:frontend": "cd frontend && npm install"
  }
}
```

Then run:
```bash
npm run dev:frontend
npm run dev:backend
```

---

## Verification Checklist

- [ ] Vite dev server runs without errors
- [ ] Tailwind classes apply correctly in browser
- [ ] Hot module replacement (HMR) works
- [ ] PostCSS config has `@tailwindcss/postcss` plugin
- [ ] `app.css` contains `@import "tailwindcss";`
- [ ] `main.tsx` imports `app.css`
- [ ] Backend runs on separate port (e.g., 8000)
- [ ] Frontend runs on Vite's port (e.g., 5173)

---

## Next Steps

1. Configure CORS in FastAPI if making API calls
2. Set up environment variables with `.env` files
3. Configure proxy in `vite.config.ts` if needed
4. Add React Router for navigation
5. Set up state management (Context API, Zustand, etc.)

Your setup is now complete! 🚀