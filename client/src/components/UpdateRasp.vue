<template>
    <div>
        <div class="row">
            <div class="col">
                <h3 class="pb-4">라즈베리파이 업데이트</h3>
            </div>
        </div>
        <div class="row">
            <div class="col pb-2">
                <h5 class="pb-2">대상</h5>
                <span class="target-rasp" v-for="rasp in selectedRasp" :key="rasp._id">{{ rasp.name }} ({{rasp._id}})</span>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col">
                <p>라즈베리파이에 설치된 서버 애플리케이션을 업데이트합니다. 일시적으로 접속이 끊길 수 있습니다. 정말 진행하시겠습니까?</p>
                <button class="btn btn-primary" @click="updateRasp">업데이트</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

import CONSTANT from "../constant";

export default {
    name: "UpdateRasp",
    mounted: function() {
        if (this.selectedRasp.length == 0) {
            alert("업데이트할 라즈베리파이를 하나 이상 선택해주세요.");
            return this.$router.push({ name: "Home" });
        }
        this.$store.dispatch(CONSTANT.CHANGE_SELECTING, false);
    },
    methods: {
        updateRasp: function() {
            for (var i = 0; i < this.selectedRasp.length; i++) {
                this.$store.dispatch(
                    CONSTANT.UPDATE_RASP,
                    this.selectedRasp[i]._id
                );
            }
        }
    },
    computed: mapState(["selectedRasp"])
};
</script>

<style scoped>
span.target-rasp {
    border: 2px solid #b3e5fc;
    border-radius: 0.25rem;
    padding: 10px 15px;
}
</style>
