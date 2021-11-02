// 配置 axios
import axios from "axios";
import { baseURL } from "./baseURL";

const API = axios.create({
  baseURL,
});

export { API };
