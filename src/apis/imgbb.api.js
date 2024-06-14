import axios from "axios";

const { API_KEY_IMGBB } = import.meta.env;

export const URL_UPLOAD_IMAGE = `https://api.imgbb.com/1/upload?key=${API_KEY_IMGBB}`;

const imgbbApi = {
  uploadImgBB(body) {
    return axios.post(URL_UPLOAD_IMAGE, body);
  },
};

export default imgbbApi;
