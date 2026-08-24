# Visionote Sticky Notes Platform

Visionote is a modern sticky notes platform featuring a FastAPI backend powered by MongoDB and a React + Vite frontend styled with Tailwind CSS v4.

---

## Repository Structure

*   `/backend` - FastAPI Python server
*   `/frontend` - React SPA (Vite)

---

## 🛠️ Build and Start Commands

### Frontend
Run these commands inside the `/frontend` directory:
```bash
# Install dependencies
npm install

# Build static assets (Production)
npm run build

# Start dev server
npm run dev
```

### Backend
Run these commands inside the `/backend` directory:
```bash
# Setup virtual environment (Windows)
python -m venv vnote-env
.\vnote-env\Scripts\Activate.ps1

# Setup virtual environment (macOS/Linux)
python3 -m venv vnote-env
source vnote-env/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend dev server
uvicorn app.main:app --reload

# Start backend production server
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

---

## 🔑 Environment Variables

### Frontend (`/frontend/.env`)
Create a `.env` file inside the `frontend` folder containing:
*   `VITE_API_URL` (e.g., `http://localhost:8000` or the live backend endpoint)

### Backend (`/backend/app/.env`)
Create a `.env` file inside `backend/app` containing:
*   `MONGODB_URL` (MongoDB cluster connection URI)
*   `DATABASE_NAME` (e.g., `visionate`)
*   `ALLOWED_ORIGINS` (comma-separated origins, e.g., `http://localhost:5173,https://visionote.vercel.app`)

---

## 🚀 Deployment

Refer to the detailed deployment documentation or config files:
*   [Vercel Configuration](frontend/vercel.json) (Frontend SPA routing rewrite setup)
*   [Backend Environment Template](backend/app/.env.example)
*   [Frontend Environment Template](frontend/.env.example)
