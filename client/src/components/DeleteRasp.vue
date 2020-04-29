<template>
    <div>
        <div class="row">
            <div class="col">
                <h3 class="pb-4">라즈베리파이 삭제</h3>
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
                <p>라즈베리파이를 삭제하면 다시 추가하기 전까지 조작할 수 없습니다. 정말 삭제하시겠습니까?</p>
                <button class="btn btn-danger" @click="deleteRasp">삭제하기</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

import CONSTANT from "../constant";

export default {
    name: "DeleteRasp",
    mounted: function() {
        if (this.selectedRasp.length == 0) {
            alert("삭제할 라즈베리파이를 하나 이상 선택해주세요.");
            return this.$router.push({ name: "Home" });
        }
        this.$store.dispatch(CONSTANT.CHANGE_SELECTING, false);
    },
    methods: {
        deleteRasp: function() {
            for (var i = 0; i < this.selectedRasp.length; i++) {
                this.$store.dispatch(
                    CONSTANT.DELETE_RASP,
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
    margin: 5px 2px;
    display: inline-block;
}
</style>
