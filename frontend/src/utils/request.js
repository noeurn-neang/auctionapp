import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api"
});

instance.interceptors.request.use(
  async config => {
    config.headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Accept": "application/json"
    };

    const user = localStorage.getItem("user")
    if (user) {
      config.headers.user_id = JSON.parse(user).id;
    }

    return config;
  },
  err => Promise.reject(err)
);

instance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error.response.data)
);

export default instance;
