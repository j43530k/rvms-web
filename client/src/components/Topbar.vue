<template>
    <nav class="navbar navbar-dark bg-blue900" v-if="selecting === false">
        <router-link class="navbar-brand ml-2" :to="{name:'Home'}">RVMS</router-link>
        <span class="d-flex">
            <router-link class="nav-link" :to="{name:'UpdateWebServer'}" v-if="$route.path == '/'"><i class="fas fa-cloud-upload-alt"></i></router-link>
            <a class="nav-link" @click="changeSelecting(true)" v-if="$route.path == '/'"><i class="fas fa-check"></i></a>
            <router-link class="nav-link" :to="{name:'AddRasp'}"><i class="fas fa-plus"></i></router-link>
        </span>
    </nav>
    <nav class="navbar navbar-dark bg-lightblue600" v-else>
        <span class="text-light mx-auto">{{ selectedRasp.length }}개 선택됨</span>
        <span class="d-flex">
            <a class="nav-link" @click="selectAll()"><i class="fas fa-check-double"></i></a>
            <a class="nav-link" @click="changeSelecting(false)"><i class="fas fa-times"></i></a>
            <span class="dropdown">
                <a class="nav-link" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-ellipsis-v"></i></a>
                <div class="dropdown-menu dropdown-right" aria-labelledby="navbarDropdown">
                    <router-link class="dropdown-item" :to="{name:'UploadVideo'}"><i class="fas fa-upload mr-2"></i>영상 업로드</router-link>
                    <router-link class="dropdown-item" :to="{name:'UpdateRasp'}"><i class="fas fa-cloud-upload-alt mr-2"></i>소프트웨어 업데이트</router-link>
                    <div class="dropdown-divider"></div>
                    <router-link class="dropdown-item text-danger" :to="{name:'DeleteRasp'}"><i class="fas fa-trash-alt mr-2"></i>삭제</router-link>
                </div>
            </span>
        </span>
    </nav>
</template>

<script>
import { mapState } from "vuex";

import CONSTANT from "../constant";

export default {
    name: "Topbar",
    computed: mapState(["selecting", "selectedRasp", "rasps"]),
    methods: {
        selectAll: function() {
            for (var i = 0; i < this.rasps.length; i++) {
                this.$store.dispatch(
                    CONSTANT.TOGGLE_SELECTING_RASP,
                    this.rasps[i]
                );
            }
        },
        changeSelecting: function(payload) {
            this.$store.dispatch(CONSTANT.CHANGE_SELECTING, payload);
        }
    }
};
</script>

<style scoped>
.bg-lightblue600 {
    background-color: #039be5;
}
.bg-blue900 {
    background-color: #0d47a1;
}

.navbar {
    height: 56px;
}

a.nav-link {
    cursor: pointer;
    color: #cccccc;
}
a.nav-link:hover {
    color: #eeeeee;
}
a.dropdown-item {
    cursor: pointer;
}
i.fas {
    width: 16px;
    text-align: center;
}

.dropdown-right {
    left: auto;
    right: 0;
    text-align: right;
}
</style>
