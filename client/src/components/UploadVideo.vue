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
                    <input type="file" name="video" accept="video/mp4,video/x-m4v,video/*" @change="uploadVideo($event.target.files)" ref="fileInput">
                    <div class="text">
                        <div>영상 파일을</div>
                        <div>Drag&Drop 하거나</div>
                        <div>여기를 클릭해서 선택</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" :style="{width:uploaded.toFixed(2)+'%'}" :aria-valuenow="uploaded.toFixed(2)" aria-valuemin="0" aria-valuemax="100">{{ uploaded.toFixed(2) }}%</div>
                </div>
            </div>
        </div>
        <div class="row mt-1" v-for="rasp in selectedRasp" :key="rasp._id" v-if="uploadedToRasp[uploadedToRasp.findIndex(function(e) {return e.id == rasp._id;})]">
            <div class="col">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" :style="{width:uploadedPercent(rasp)+'%'}" :aria-valuenow="uploadedPercent(rasp)" aria-valuemin="0" aria-valuemax="100">{{ rasp.name }} : {{ uploadedPercent(rasp) }}%</div>
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
        this.selectedRasp.forEach(rasp => {
            this.uploadedToRasp.push({
                id: rasp._id,
                percent: 0
            });
        });
    },
    data: function() {
        return {
            uploadedToRasp: []
        };
    },
    sockets: {
        connect: function() {
            console.log("Socket Connected.");
        },
        uploadedVideoSize: function(info) {
            this.uploadedToRasp[
                this.uploadedToRasp.findIndex(function(e) {
                    return e.id == info.rasp._id;
                })
            ].percent = (info.size / info.total * 100).toFixed(2);
        },
        videoUploaded: function(info) {
            this.uploadedToRasp[
                this.uploadedToRasp.findIndex(function(e) {
                    return e.id == info.rasp._id;
                })
            ].uploaded = true;

            var count = 0;
            for (var i = 0; i < this.uploadedToRasp.length; i++) {
                if (this.uploadedToRasp[i].uploaded) {
                    count++;
                }
            }
            if (count == this.uploadedToRasp.length) {
                alert("업로드 완료");
                this.$router.push({ name: "Home" });
            }
        }
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
        },
        uploadedPercent: function(rasp) {
            return this.uploadedToRasp[
                this.uploadedToRasp.findIndex(function(e) {
                    return e.id == rasp._id;
                })
            ].percent;
        }
    },
    computed: mapState(["selectedRasp", "uploaded"])
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

.dropbox {
    outline: 2px dashed #81c784;
    background: #a5d6a7;
    min-width: 300px;
    min-height: 300px;
    text-align: center;
    margin-bottom: 15px;
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
