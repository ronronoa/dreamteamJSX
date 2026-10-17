export const API_URL = "https://ruper.dpdns.org/api";
export const WS_URL = "";

export async function checkBackend() {
  try {
    const res = await fetch(`${API_URL}/health`)

    if (!res.ok) {
      return null
    }

    const data = await res.json()

    console.log(data)

    return data
  } catch {
    return null
  }
}
