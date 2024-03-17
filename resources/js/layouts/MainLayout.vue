<template>
      <div>
       <HomePage/>
        <router-view>
     </router-view>
  </div>
</template>

<script lang="ts">
    import { defineComponent} from "vue";
import HomePage from "../pages/home/HomePage.vue";



    export default defineComponent({
        name: "MainLayout",

        components: {
        },
     
       
    });

</script>

<style lang="scss">

</style>
