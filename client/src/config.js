var BASE_URL = "http://localhost:3000";

export default {
  BASE_URL,
  RASP_ONE: BASE_URL + "/rasps/${id}",
  RASP_RENAME: BASE_URL + "/rasps/${id}/rename",
  RASP_UPDATE: BASE_URL + "/rasps/${id}/update",
  RASPS: BASE_URL + "/rasps",
  RASPS_VIDEO: BASE_URL + "/rasps/video",
  WEB_SERVER_UPDATE: BASE_URL + "/update"
};
