

export interface TokensObj {
  access: string;
  refresh: string;
}

export const getStoredTokens = (): TokensObj | null => {
  if (typeof window === "undefined") return null;

  const access = localStorage.getItem("access_token");
  const refresh = localStorage.getItem("refresh_token");

  return access && refresh ? { access, refresh } : null;
};

export const storeTokens = (tokens: TokensObj) => {
  if (typeof window === "undefined") return;

  localStorage.setItem("access_token", tokens.access);
  localStorage.setItem("refresh_token", tokens.refresh);
};

export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;

  const access = localStorage.getItem("access_token");
  return access ? access : null;
};


export const getRefreshToken = (): string | null => {
  if (typeof window === "undefined") return null;

  const refresh = localStorage.getItem("refresh_token");
  return refresh ? refresh : null;
};

export const setAccessToken = (tokens: TokensObj) => {
  if (typeof window === "undefined") return;

  localStorage.setItem("access_token", tokens.access);
};

export const setRefreshToken = (tokens: TokensObj) => {
  if (typeof window === "undefined") return;

  localStorage.setItem("refresh_token", tokens.refresh);
};

export const removeAccessToken = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("access_token");
};

export const removeRefreshToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("refresh_token");
};

export const clearTokens = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
