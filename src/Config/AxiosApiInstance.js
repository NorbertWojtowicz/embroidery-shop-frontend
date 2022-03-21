import CookieUtil from "../CookieUtil/CookieUtil";
import API_URL from "./API_URL";
const axios = require("axios");
const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${CookieUtil.getCookie("access_token")}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Allow automatic updating of access token
axiosApiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const refreshToken = CookieUtil.getCookie("refresh_token");
    const originalRequest = error.config;
    if (
      (error.response.status === 401 || error.response.status === 500) &&
      !originalRequest._retry &&
      refreshToken !== undefined
    ) {
      originalRequest._retry = true;
      await axios
        .post(
          `${API_URL}/token/refresh`,
          {},
          {
            headers: {
              Authorization: refreshToken,
            },
          }
        )
        .then((res) => {
          CookieUtil.setRefreshedToken(res.headers.authorization);
        })
        .catch();
      return axiosApiInstance.request(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
