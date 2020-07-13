import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.107:1357/",
});

export default api;