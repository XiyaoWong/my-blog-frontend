import Vue from "vue";
import axios from "axios";

axios.defaults.timeout = 6000; // 超时时间

axios.defaults.baseURL = "http://116.62.167.164:5555";

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // https://hitoapi.cc/sp/
    if (config.url == "https://hitoapi.cc/sp/") {
      return config;
    }

    const token = window.localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Vue.toasted.error("好像出了点错，但又不知道是哪里😕");
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    let code = response.data.code;
    let msg = response.data.msg;

    if (code && code != 0 && msg) {
      Vue.toasted.error(`${msg}`);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          Vue.toasted.error("权限不足");
          break;
        case 403:
          Vue.toasted.error("访问被禁止");
          break;
        case 404:
          Vue.toasted.error("内容不存在");
          break;
        case 500:
          Vue.toasted.error("500: Oops... INTERNAL SERVER ERROR", {
            icon: "fingerprint",
          });
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
