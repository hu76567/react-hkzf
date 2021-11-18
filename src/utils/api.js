// 配置 axios
import axios from "axios";
import { baseURL } from "./baseURL";
import { getToken,removeToken } from "./token";

const API = axios.create({
  baseURL,
});

// 请求拦截器
API.interceptors.request.use(
  function (config) {
    if (
      config.url.startsWith("/user") &&
      config.url !== "/user/registered" &&
      config.url !== "/user/login"
    ) {
      // 以user开头 加上token
      config.headers.authorization = getToken();
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
API.interceptors.response.use(
  function (response) {
    if(response.data.status===400){
       console.log('请求失败')
       removeToken()
    }else if(response.data.status===500){
      console.log('服务器出错')
    }
    return response
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { API };
