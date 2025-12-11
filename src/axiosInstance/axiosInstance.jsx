import axios from "axios";

let axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  async function (config) {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    // console.log("token", token);
    if (token) {
      config.headers["x-access-token"] = token;
      // config.headers.Authorization = token;
      // config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export const fetchProfilePic = (media) => {
  return base_Url + "uploads/user/profile_pic/" + media;
};

// export const fetchProfilePic = (media) => {
//   if (!media) return "";
//   return `${base_Url}upload/user/profile_pic/${media}`;
// };
export default axiosInstance;
