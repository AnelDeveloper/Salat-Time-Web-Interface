<template>
      <div>
       <HomePage/>
        <router-view>
     </router-view>
  </div>
</template>

<script lang="ts">
    import { defineComponent} from "vue";
    import HomePage from "../pages/Home/HomePage.vue";

    export default defineComponent({
        name: "MainLayout",
        components: {
            HomePage
        },
    });

</script>

<style lang="scss">
</style>
