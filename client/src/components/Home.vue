<template>
    <div>
        <div class="row">
            <div class="col">
                <table class="table text-center" v-if="selecting === false">
                    <tr>
                        <th scope="col">번호</th>
                        <th scope="col">이름</th>
                        <th scope="col">IP</th>
                        <th scope="col">추가 일시</th>
                        <th scope="col">재생 중인 영상</th>
                    </tr>
                    <tr class="info" v-if="rasps.length == 0">
                        <td class="text-center text-muted" colspan="5"><span>라즈베리파이가 없습니다!</span></td>
                    </tr>
                    <router-link v-else v-for="rasp in rasps" :key="rasp._id" tag="tr" class="clickable" :to="{name:'RaspInfo', params:{id:rasp._id}}">
                        <td>{{ rasp._id }}</td>
                        <td>{{ rasp.name }}</td>
                        <td>{{ rasp.ip }}</td>
                        <td>{{ dateString(rasp.created) }}</td>
                        <td>{{ (rasp.video)?(rasp.video):("재생 중인 영상 없음") }}</td>
                    </router-link>
                </table>
                <table class="table text-center" v-else>
                    <tr>
                        <th scope="col">번호</th>
                        <th scope="col">이름</th>
                        <th scope="col">IP</th>
                        <th scope="col">추가 일시</th>
                        <th scope="col">재생 중인 영상</th>
                    </tr>
                    <tr class="info" v-if="rasps.length == 0">
                        <td class="text-center text-muted" colspan="5"><span>라즈베리파이가 없습니다!</span></td>
                    </tr>
                    <tr v-else v-for="rasp in rasps" :key="rasp._id" @click="selectRasp(rasp)" :class="['selectable', {active:(selectedRasp.indexOf(rasp)!=-1)}]">
                        <td>{{ rasp._id }}</td>
                        <td>{{ rasp.name }}</td>
                        <td>{{ rasp.ip }}</td>
                        <td>{{ dateString(rasp.created) }}</td>
                        <td>{{ (rasp.video)?(rasp.video):("재생 중인 영상 없음") }}</td>
                    </tr>
                </table>
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
    name: "Home",
    components: {
        Loading
    },
    mounted: function() {
        this.$store.dispatch(CONSTANT.LOAD_RASP_LIST);
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
        selectRasp: function(rasp) {
            this.$store.dispatch(CONSTANT.TOGGLE_SELECTING_RASP, rasp);
        }
    },
    computed: mapState(["rasps", "selecting", "selectedRasp"])
};
</script>

<style scoped>
tr.clickable:hover {
    cursor: pointer;
    background-color: #00000020;
}
tr.selectable:hover {
    cursor: pointer;
    background-color: #b3e5fc60;
}
tr.selectable.active {
    cursor: pointer;
    background-color: #b3e5fcd0;
}
</style>
