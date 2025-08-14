import axios from "axios";

// Create instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://shitty_endpint:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// const noAuthRoutes = ["/api/accounts/login", "/api/accounts/register"];
//
// const shouldSkipAuth = (url: string | undefined) => {
//   return noAuthRoutes.some((route) => url?.includes(route));
// };

export default api;

// // Request interceptor – Add token if available
// api.interceptors.request.use(
//   (config) => {
//     if (typeof window !== "undefined" && !shouldSkipAuth(config.url)) {
//       const token = localStorage.getItem("access_token");
//       // console.log("token from interceptor", token);
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
//
// // Response interceptor – Handle global errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       const originalRequest = error.config;
//       if (!originalRequest.url.includes("/api/accounts/login")) {
//         console.warn("Unauthorized. Redirecting...");
//         window.location.href = "/loginUser";
//       }
//     }
//     return Promise.reject(error);
//   }
// );
//
// export default api;
