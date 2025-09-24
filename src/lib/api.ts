// src/lib/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // backend kökü
  withCredentials: false,
});

// Token ekleme (request)
api.interceptors.request.use((config) => {
  const access = localStorage.getItem("access");
  if (access) config.headers.Authorization = `Bearer ${access}`;
  return config;
});

// 401'de refresh dene (response)
let refreshing = false;
let queue: Array<() => void> = [];

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const run = async () => {
        const refresh = localStorage.getItem("refresh");
        if (!refresh) throw error;

        const { data } = await axios.post(
          "http://127.0.0.1:8000/accounts/auth/token/refresh/",
          { refresh }
        );
        localStorage.setItem("access", data.access);
        original.headers.Authorization = `Bearer ${data.access}`;
        return api(original);
      };

      if (refreshing) {
        // başka bir refresh bitince tekrar dene
        return new Promise((resolve, reject) => {
          queue.push(() => run().then(resolve).catch(reject));
        });
      }

      try {
        refreshing = true;
        const resp = await run();
        return resp;
      } finally {
        refreshing = false;
        queue.forEach((fn) => fn());
        queue = [];
      }
    }
    return Promise.reject(error);
  }
);