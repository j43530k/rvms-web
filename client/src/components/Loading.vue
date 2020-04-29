<template>
    <div class="loading" v-if="loading">
        <div class="loader">
            <pacman-loader></pacman-loader>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

import PacmanLoader from "vue-spinner/src/PacmanLoader.vue";

export default {
    name: "Home",
    components: {
        PacmanLoader
    },
    computed: mapState(["loading"])
};
</script>

<style scoped>
.loading {
    display: table;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: #00000040;
}
.loader {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
.loader > .v-spinner {
    width: 120px;
    margin: auto;
}
</style>
