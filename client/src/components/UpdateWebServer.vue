<template>
    <div>
        <div class="row">
            <div class="col">
                <h3 class="pb-4">웹 서버 업데이트</h3>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <p>라즈베리파이에 설치된 웹 서버 애플리케이션을 업데이트합니다. 일시적으로 접속이 끊길 수 있습니다. 정말 진행하시겠습니까?</p>
                <button class="btn btn-primary" @click="updateWebServer">업데이트</button>
            </div>
        </div>
    </div>
</template>

<script>
import CONSTANT from "../constant";

export default {
    name: "UpdateWebServer",
    methods: {
        updateWebServer: function() {
            this.$store.dispatch(CONSTANT.UPDATE_WEB_SERVER);
        }
    }
};
</script>

<style scoped>
</style>
