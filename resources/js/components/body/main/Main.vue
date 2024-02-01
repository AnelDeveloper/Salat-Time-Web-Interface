<template>
    <div class="d-flex flex-column flex-root app-root" id="kt_app_root">
        <div class="app-page flex-column flex-column-fluid" id="kt_app_page">
            <Navigation />
            <div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
                <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
                    <div class="d-flex flex-column flex-column-fluid">
                        <div id="kt_app_content" class="app-content flex-column-fluid">
                            <router-view>

                            </router-view>
                        </div>
                    </div>
      
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, nextTick, onBeforeMount, onMounted } from "vue";

    import Navigation from '../navigation/Navigation.vue'


    export default defineComponent({
        name: "Main",

        components: {
            Navigation
        },
     
       
    });

</script>

<style lang="scss">

</style>
