import api from "../api/rvmsapi";
import CONSTANT from "../constant";
import router from "../router";

export default {
  [CONSTANT.CHANGE_SELECTING]: (store, payload) => {
    if (payload) {
      store.commit(CONSTANT.INIT_SELECTED_RASP)
    }
    store.commit(CONSTANT.CHANGE_SELECTING, payload);
  },
  [CONSTANT.LOAD_RASP_INFO]: (store, payload) => {
    store.commit(CONSTANT.CHANGE_LOADING, true);
    api.loadRaspInfo(payload).then(response => {
      if (response.data.status == "success" && response.data.rasp != null) {
        store.commit(CONSTANT.LOAD_RASP_INFO, response.data.rasp);
        store.commit(CONSTANT.CHANGE_LOADING, false);
      } else {
        alert("정보를 불러오는데 실패했습니다.\n새로고침 후에도 문제가 지속되면 관리자에게 문의해주세요.");
      }
    })
  },
  [CONSTANT.LOAD_RASP_LIST]: (store, payload) => {
    store.commit(CONSTANT.CHANGE_LOADING, true);
    api.loadRaspList(payload).then(response => {
      if (response.data.status == "success") {
        store.commit(CONSTANT.LOAD_RASP_LIST, response.data.rasps);
        store.commit(CONSTANT.CHANGE_LOADING, false);
      } else {
        alert("정보를 불러오는데 실패했습니다.\n새로고침 후에도 문제가 지속되면 관리자에게 문의해주세요.");
      }
    })
  },
  [CONSTANT.ADD_RASP]: (store, payload) => {
    api.addRasp(payload).then(response => {
      if (response.data.status == "success") {
        alert(payload.name + " 라즈베리파이 추가 성공");
        router.push({
          name: "Home"
        });
      } else {
        alert("라즈베리파이를 추가하는데 실패했습니다.\n재시도 후에도 문제가 지속되면 관리자에게 문의해주세요.");
      }
    })
  },
  [CONSTANT.DELETE_RASP]: (store, payload) => {
    api.deleteRasp(payload).then(response => {
      if (response.data.status == "success") {
        alert(payload + "번 라즈베리파이 삭제 성공");
        router.push({
          name: "Home"
        });
      } else {
        alert("라즈베리파이를 삭제하는데 실패했습니다.\n재시도 후에도 문제가 지속되면 관리자에게 문의해주세요.");
      }
    })
  },
  [CONSTANT.UPDATE_RASP]: (store, payload) => {
    api.updateRasp(payload).then(response => {
      if (response.data.status == "success") {
        alert(payload + "번 라즈베리파이 업데이트 성공");
        router.push({
          name: "Home"
        });
      } else {
        alert("라즈베리파이를 업데이트하는데 실패했습니다.\n재시도 후에도 문제가 지속되면 관리자에게 문의해주세요.");
      }
    })
  },
  [CONSTANT.RENAME_RASP]: (store, payload) => {
    api.renameRasp(payload).then(response => {
      if (response.data.status == "success") {
        store.dispatch(CONSTANT.LOAD_RASP_INFO, payload.id);
      } else {
        alert("라즈베리파이의 이름을 변경하는데 실패했습니다.\n재시도 후에도 문제가 지속되면 관리자에게 문의해주세요.");
      }
    })
  },
  [CONSTANT.UPLOAD_VIDEO]: (store, payload) => {
    api.uploadVideo(payload).then(response => {
      if (response.data.status == "success") {
        alert("웹 서버에 영상 업로드 성공");
      } else {
        alert("라즈베리파이에 영상을 업로드하는데 실패했습니다.\n재시도 후에도 문제가 지속되면 관리자에게 문의해주세요.\n실패한 라즈베리파이 : " + response.data.errors.join(", "));
      }
    })
  },
  [CONSTANT.TOGGLE_SELECTING_RASP]: (store, payload) => {
    if (store.state.selectedRasp.indexOf(payload) == -1) {
      store.commit(CONSTANT.SELECT_RASP, payload);
    } else {
      store.commit(CONSTANT.DESELECT_RASP, payload);
    }
  },
  [CONSTANT.UPDATE_WEB_SERVER]: (store, payload) => {
    api.updateWebServer().then(response => {
      if (response.data.status == "success") {
        alert("웹 서버 업데이트 성공");
        router.push({
          name: "Home"
        });
      } else {
        alert("웹 서버를 업데이트하는데 실패했습니다.\n재시도 후에도 문제가 지속되면 관리자에게 문의해주세요.");
      }
    })
  },
};
