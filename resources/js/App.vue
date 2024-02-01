<template>
    <div>
        <Main></Main>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Main from "./components/body/main/Main.vue";

export default defineComponent({
    name: "App",
    components: {
        Main
    },
});
</script>

<style>
#app {
    display: contents;
}
</style>
