const API_BASE = "http://localhost:3000"

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<{ ok: boolean; status: number; data: T }> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  })

  const data = await res.json()
  return { ok: res.ok, status: res.status, data }
}

export async function getSession() {
  return apiRequest<{ session: unknown; user: { id: string; name: string; email: string } } | null>(
    "/api/auth/get-session"
  )
}

export async function signIn(email: string, password: string) {
  return apiRequest<{ token: string; user: { id: string; name: string; email: string } }>(
    "/api/auth/sign-in/email",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }
  )
}

export async function saveBookmark(payload: { url: string; html: string; title?: string }) {
  return apiRequest<{ bookmarkId: string; title: string; status: string }>("/api/ingest", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}
