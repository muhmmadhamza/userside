import axios from "axios";
// import { toast } from "react-toastify";
// import { refreshAccessToken } from "./backend";
// import jwtDecode from "jwt-decode";
// import moment from "moment";

const API_URL = process.env.REACT_APP_BASE_URL;

const axiosApi = axios.create({
  baseURL: API_URL,
});

// axiosApi.interceptors.request.use(function (config) {
//   let token = JSON.parse(sessionStorage.getItem('User'));
//   config.headers['Token'] = token ? token.accessToken : '';
//   config.headers['BackendPassword'] = import.meta.env['VITE_BACKENDPASSWORD'];
//   return config;
// });

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then((response) => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi.post(url, { ...data }, { ...config }).then((response) => response.data);
}

export async function postFormData(url, data, config = {}) {
  return axiosApi.post(url, data, { ...config }).then((response) => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi.put(url, { ...data }, { ...config }).then((response) => response.data);
}

export async function putFormData(url, data, config = {}) {
  return axiosApi.put(url, data, { ...config }).then((response) => response.data);
}

export async function patch(url, data, config = {}) {
  return axiosApi.patch(url, { ...data }, { ...config }).then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi.delete(url, { ...config }).then((response) => response.data);
}
