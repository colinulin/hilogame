<template>
    <div id="app">
        <Header />
        <b-container class="mb-2 mt-2"><router-view /></b-container>
    </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
    name: "App",
    components: {
        Header
    },
    data() {
        return {};
    }
};
</script>

<style></style>
