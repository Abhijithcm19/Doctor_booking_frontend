// Backend URL: set VITE_BASE_URL in Netlify (e.g. https://your-app.onrender.com).
// Falls back to the local backend during development.
export const BASE_URL = (import.meta.env.VITE_BASE_URL || "http://localhost:4000").replace(/\/$/, "");

export const token = localStorage.getItem("token")
