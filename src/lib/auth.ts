import api from "@/lib/axios"

export interface TokenResponse {
  access: string
  refresh: string
}

export interface UserData {
  id: number
  email: string
  first_name: string
  last_name: string
  user_type: string
  profile_image: string
  store: {
    id: number
    logo: string
    name: string
    store_type: string
    city: string
    district: string
    location_link: string
    address: string
    phone: string
    email: string
    social_media_links: any
    latitude: string
    longitude: string
    created_at: string
    updated_at: string
    is_verified: boolean
    business_registration_number: string
    documents: string
    admin_notes: string
    views: number
    clicks_on_discounts: number
    orders_received: number
    user: number
    followers: number[]
  }
}

// ------------------
// Token Utils
// ------------------
export const getStoredTokens = (): TokenResponse | null => {
  if (typeof window === "undefined") return null

  const access = localStorage.getItem("access_token")
  const refresh = localStorage.getItem("refresh_token")

  return access && refresh ? { access, refresh } : null
}

export const storeTokens = (tokens: TokenResponse) => {
  if (typeof window === "undefined") return

  localStorage.setItem("access_token", tokens.access)
  localStorage.setItem("refresh_token", tokens.refresh)
}

export const clearTokens = () => {
  if (typeof window === "undefined") return

  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
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
    method?: "GET" | "POST" | "PUT" | "DELETE"
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

// ------------------
// Fetch Current User
// ------------------
export const fetchUserData = async (): Promise<UserData> => {
  try {
    const data = await fetchWithAuth<UserData>("/api/me/")
    return data
  } catch (error) {
    throw new Error("Failed to fetch user data")
  }
}
