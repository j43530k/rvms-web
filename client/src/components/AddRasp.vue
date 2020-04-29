<template>
    <div>
        <div class="row">
            <div class="col">
                <h3 class="pb-4">라즈베리파이 추가</h3>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label for="new-rasp-name">이름</label>
                    <input type="text" class="form-control" placeholder="라즈베리파이 이름" v-model="new_rasp.name" @keyup.enter="addRasp">
                    <small class="form-text text-muted">라즈베리파이를 구분할 수 있는 이름을 지어주세요.</small>
                </div>
                <div class="form-group">
                    <label for="new-rasp-ip">IP</label>
                    <input type="text" class="form-control" placeholder="라즈베리파이 IP" v-model="new_rasp.ip" @keyup.enter="addRasp">
                </div>
                <div class="text-right">
                    <button type="button" class="btn btn-success" @click="addRasp">추가</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

import CONSTANT from "../constant";

export default {
    name: "AddRasp",
    data: function() {
        return {
            new_rasp: {
                name: "",
                ip: ""
            }
        };
    },
    methods: {
        addRasp: function() {
            if (this.new_rasp.name == "" || this.new_rasp.ip == "") {
                return alert("빈 칸을 모두 채워주세요.");
            } else {
                this.$store.dispatch(CONSTANT.ADD_RASP, this.new_rasp);
            }
        }
    }
};
</script>

<style scoped>
</style>
