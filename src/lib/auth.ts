import api from "@/lib/axios"
import Cookies from "js-cookie"

// ------------------
// Token Utils
// ------------------

export const getStoredTokens = (): any | null => {
  if (typeof window === "undefined") return null

  const access = localStorage.getItem("access_token")
  const refresh = localStorage.getItem("refresh_token")

  return access && refresh ? { access, refresh } : null
}

export const storeTokens = (tokens: any) => {
  if (typeof window === "undefined") return

  localStorage.setItem("access_token", tokens.access)
  localStorage.setItem("refresh_token", tokens.refresh)
}

export const clearTokens = () => {
  if (typeof window === "undefined") return

  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
  Cookies.remove('access_token')
  Cookies.remove('refresh_token')
}

// ------------------
// Token Refresh
// ------------------
export const refreshAccessToken = async (): Promise<string | null> => {
  const tokens = getStoredTokens()
  if (!tokens?.refresh) return null

  try {
    const response = await api.post("/token/refresh/", {
      refresh: tokens.refresh,
    })

    const data = response.data
    storeTokens({ access: data.access, refresh: tokens.refresh })
    return data.access
  } catch (error) {
    console.error("Token refresh failed:", error)
    clearTokens()
    return null
  }
}

// ------------------
// Authenticated Request Wrapper
// ------------------
export const fetchWithAuth = async <T = any>(
  url: string,
  options: {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
    data?: any
    headers?: Record<string, string>
  } = {}
): Promise<T> => {
  const tokens = getStoredTokens()
  if (!tokens?.access) throw new Error("No access token available")

  try {
    const response = await api.request<T>({
      url,
      method: options.method || "GET",
      data: options.data,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${tokens.access}`,
      },
    })
    return response.data
  } catch (error: any) {
    if (error.response?.status === 401) {
      const newAccess = await refreshAccessToken()
      if (newAccess) {
        // Retry original request with new access token
        const retryResponse = await api.request<T>({
          url,
          method: options.method || "GET",
          data: options.data,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newAccess}`,
          },
        })
        return retryResponse.data
      } else {
        throw new Error("Authentication failed. Could not refresh token.")
      }
    }
    throw error
  }
}
