import { useUserStore } from "@/store/user";
import axios, { type RawAxiosRequestHeaders, type AxiosResponse } from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import { failCode } from "./constant";
import { responseData } from "@/type/index";

const service = axios.create({
  baseURL:
    process.env.VUE_APP_ENV === "production"
      ? process.env.VUE_APP_SERVER_URL
      : process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000,
  withCredentials: true, // send cookies when cross-domain requests
});

// Request interceptors
service.interceptors.request.use(
  (config) => {
    const customerHeaders: RawAxiosRequestHeaders = {
      "Content-Type": "application/json;charset=utf-8",
    };
    if (useUserStore().getToken) {
      customerHeaders.accessToken = useUserStore().getToken;
    }
    config.headers = Object.assign(config.headers ?? {}, customerHeaders);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptors
service.interceptors.response.use(
  (response) => {
    const res: responseData = response.data;
    const code = res.code;
    if (code === failCode.userNotAuthorized) {
      ElMessageBox.confirm(
        "你已被登出，可以取消继续留在该页面，或者重新登录",
        "确定登出",
        {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        useUserStore().handleLogout();
        location.reload();
      });
      return Promise.reject(res.msg);
    }
  },
  (error) => {
    ElMessage({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
