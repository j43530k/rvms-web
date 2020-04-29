import CONFIG from "../config";
import axios from "axios";

export default {
  loadRaspInfo: function (id) {
    return axios.get(CONFIG.RASP_ONE.replace("${id}", id));
  },
  loadRaspList: function () {
    return axios.get(CONFIG.RASPS);
  },
  addRasp: function (new_rasp) {
    return axios.post(CONFIG.RASPS, {
      name: new_rasp.name,
      ip: new_rasp.ip
    });
  },
  deleteRasp: function (id) {
    return axios.delete(CONFIG.RASP_ONE.replace("${id}", id));
  },
  updateRasp: function (id) {
    return axios.post(CONFIG.RASP_UPDATE.replace("${id}", id));
  },
  renameRasp: function (rasp) {
    return axios.put(CONFIG.RASP_RENAME.replace("${id}", rasp.id), {
      name: rasp.name
    });
  },
  uploadVideo: async function (payload) {
    var formData = new FormData();
    formData.append("ids", payload.ids);
    formData.append("video", payload.file, payload.file.name);
    return axios.post(CONFIG.RASPS_VIDEO, formData);
  },
  updateWebServer: function () {
    return axios.post(CONFIG.WEB_SERVER_UPDATE);
  },
};
