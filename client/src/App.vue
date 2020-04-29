<template>
    <div>
        <topbar></topbar>
        <div class="container">
            <div class="row">
                <div class="col">
                    <h3 class="pt-5">대덕소프트웨어마이스터고등학교</h3>
                    <h1 class="pb-5">라즈베리파이 영상 관리 시스템</h1>
                </div>
            </div>
            <router-view/>
        </div>
    </div>
</template>

<script>
import Topbar from "./components/Topbar";

export default {
    name: "App",
    components: { Topbar }
};
</script>

<style>
</style>
