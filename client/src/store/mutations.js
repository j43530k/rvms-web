import CONSTANT from "../constant";

export default {
  [CONSTANT.CHANGE_SELECTING]: (state, payload) => {
    state.selecting = payload;
  },
  [CONSTANT.INIT_SELECTED_RASP]: (state) => {
    state.selectedRasp = [];
  },
  [CONSTANT.LOAD_RASP_INFO]: (state, payload) => {
    state.rasp = payload;
  },
  [CONSTANT.LOAD_RASP_LIST]: (state, payload) => {
    state.rasps = payload;
  },
  [CONSTANT.SELECT_RASP]: (state, payload) => {
    state.selectedRasp.push(payload);
  },
  [CONSTANT.DESELECT_RASP]: (state, payload) => {
    state.selectedRasp.splice(state.selectedRasp.indexOf(payload), 1);
  },
  [CONSTANT.CHANGE_UPLOADED]: (state, payload) => {
    state.uploaded = payload;
  },
  [CONSTANT.CHANGE_LOADING]: (state, payload) => {
    state.loading = payload;
  },
};
