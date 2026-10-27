const PRODUCTION_API_URL = "https://ruper.dpdns.org/api";
const DEVELOPMENT_API_URL = "http://localhost:3000/api";

export const API_URL = import.meta.env.VITE_API_URL?.trim() || (import.meta.env.DEV ? DEVELOPMENT_API_URL : PRODUCTION_API_URL);
export const WS_URL = "";

export async function checkBackend() {
  try {
    const res = await fetch(`${API_URL}/health`)

    if (!res.ok) {
      return null
    }

    const data = await res.json()

    return data
  } catch {
    return null
  }
}
