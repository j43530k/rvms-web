<template>
    <div>
        <div class="row">
            <div class="col">
                <h3 class="pb-4">라즈베리파이 정보</h3>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <table class="table text-center">
                    <tr>
                        <th scope="col">분류</th>
                        <th scope="col">값</th>
                    </tr>
                    <tr>
                        <th scope="row">번호</th>
                        <td>{{ rasp._id }}</td>
                    </tr>
                    <tr>
                        <th scope="row">이름</th>
                        <td>{{ rasp.name }}</td>
                    </tr>
                    <tr>
                        <th scope="row">IP</th>
                        <td>{{ rasp.ip }}</td>
                    </tr>
                    <tr>
                        <th scope="row">추가 일시</th>
                        <td>{{ dateString(rasp.created) }}</td>
                    </tr>
                    <tr>
                        <th scope="row">재생 중인 동영상</th>
                        <td>{{ (rasp.video)?(rasp.video):("재생 중인 영상 없음") }}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="row" v-if="renaming">
            <div class="col">
                <div class="input-group mb-3">
                    <input class="form-control" type="text" placeholder="새로운 이름을 입력해주세요." v-model="new_name" ref="nameInput">
                    <div class="input-group-append">
                        <button class="btn btn-outline-success" @click="renameRasp">제출</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="text-center">
                    <button type="button" class="btn btn-primary" @click="renaming = !renaming">이름 변경하기</button>
                    <button type="button" class="btn btn-primary" @click="uploadVideo">영상 업로드</button>
                    <button type="button" class="btn btn-primary" @click="updateRasp">소프트웨어 업데이트</button>
                    <button type="button" class="btn btn-danger" @click="deleteRasp">삭제하기</button>
                </div>
            </div>
        </div>
        <loading></loading>
    </div>
</template>

<script>
import { mapState } from "vuex";

import CONSTANT from "../constant";
import Loading from "./Loading";

export default {
    name: "RaspInfo",
    components: {
        Loading
    },
    props: ["id"],
    mounted: function() {
        this.$store.dispatch(CONSTANT.LOAD_RASP_INFO, this.id);
    },
    data: function() {
        return { renaming: false, new_name: "" };
    },
    methods: {
        dateString: function(timestamp) {
            var date = new Date(timestamp);
            var twoDigits = function(n) {
                return n < 10 ? "0" + n : n;
            };
            return (
                date.getFullYear() +
                "-" +
                twoDigits(date.getMonth() + 1) +
                "-" +
                twoDigits(date.getDate()) +
                " " +
                twoDigits(date.getHours()) +
                ":" +
                twoDigits(date.getMinutes()) +
                ":" +
                twoDigits(date.getSeconds())
            );
        },
        renameRasp: function() {
            this.$store.dispatch(CONSTANT.RENAME_RASP, {
                id: this.id,
                name: this.new_name
            });
            this.new_name = "";
            this.renaming = false;
        },
        uploadVideo: function() {
            this.$store.commit(CONSTANT.INIT_SELECTED_RASP);
            this.$store.dispatch(CONSTANT.TOGGLE_SELECTING_RASP, this.rasp);
            this.$router.push({ name: "UploadVideo" });
        },
        updateRasp: function() {
            this.$store.commit(CONSTANT.INIT_SELECTED_RASP);
            this.$store.dispatch(CONSTANT.TOGGLE_SELECTING_RASP, this.rasp);
            this.$router.push({ name: "UpdateRasp" });
        },
        deleteRasp: function() {
            this.$store.commit(CONSTANT.INIT_SELECTED_RASP);
            this.$store.dispatch(CONSTANT.TOGGLE_SELECTING_RASP, this.rasp);
            this.$router.push({ name: "DeleteRasp" });
        }
    },
    computed: mapState(["rasp"])
};
</script>

<style scoped>
</style>
