<template>
    <div>
        <div class="row">
            <div class="col">
                <h3 class="pb-4">라즈베리파이 영상 업로드</h3>
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
                <div class="dropbox">
                    <input type="file" accept="video/mp4,video/x-m4v,video/*" @change="uploadVideo($event.target.files)" @drop="uploadVideo($event.target.files)" ref="fileInput">
                    <div class="text">
                        <div>영상 파일을</div>
                        <div>Drag&Drop 하거나</div>
                        <div>여기를 클릭해서 선택</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

import CONSTANT from "../constant";

export default {
    name: "UploadVideo",
    mounted: function() {
        if (this.selectedRasp.length == 0) {
            alert("영상을 업로드할 라즈베리파이를 하나 이상 선택해주세요.");
            return this.$router.push({ name: "Home" });
        }
        this.$store.dispatch(CONSTANT.CHANGE_SELECTING, false);
    },
    methods: {
        uploadVideo: function(files) {
            var ids = [];
            for (var i = 0; i < this.selectedRasp.length; i++) {
                ids.push(this.selectedRasp[i]._id);
            }
            this.$store.dispatch(CONSTANT.UPLOAD_VIDEO, {
                ids: JSON.stringify(ids),
                file: files[0]
            });
            this.$refs.fileInput.type = "text";
            this.$refs.fileInput.type = "file";
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

.dropbox {
    outline: 2px dashed #81c784;
    background: #a5d6a7;
    min-width: 300px;
    min-height: 300px;
    text-align: center;
}
.dropbox > div.text {
    padding-top: 80px;
}
.dropbox > div.text > div {
    font-size: 32px;
}
.dropbox > input {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 3;
}
</style>
