<template>
    <div v-if="isVisible" class="fixed inset-0 flex justify-center items-center z-50">
      <div v-if="isLoading" class="loading-overlay">
        <LoadingState />
      </div>
      <div class="bg-emerald-100 overflow-y-auto h-full w-full">
        <div class="flex justify-center items-center h-full">
          <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 p-4 mt-8">
            <div class="flex justify-between items-center p-5 rounded-t border-b">
              <h2 class="text-xl font-semibold">{{ $t('monthlySalat') }}</h2> 
              <button @click="close" class="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 rounded">
                X
              </button>
            </div>
            <Table :class="{ 'blur': isLoading }" :times="renderedSalatTimes" :allItemsLoaded="allItemsLoaded" :loadMore="loadMore"/>
            <div class="flex justify-end mt-8">
              <PdfDownloader :data="monthlySalatTimes" fileName="Monthly-Salat-Times.pdf" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  
  <script setup>
  import { ref, watch, computed } from 'vue';
  import Table from '../../Table/Table.vue';
  import LoadingState from '../../Spinner/LoadingState.vue';
  import PdfDownloader from '../../PdfDownloader/PdfDownloader.vue';
  
  const props = defineProps({
    isVisible: Boolean,
    monthlySalatTimes: {
      type: Array,
      default: () => [],
    },
  });
  
  const emit = defineEmits(['update:isVisible']);
  
  const renderedSalatTimes = ref([]);
  const allItemsLoaded = ref(false);
  const itemsPerLoad = 10;
  const isLoading = ref(false);
  
 const close = () => {
  emit('update:isVisible', false);
  renderedSalatTimes.value = []; 
  allItemsLoaded.value = false;
};
  
  const loadMore = () => {
    isLoading.value = true; 
  
    const itemsToAdd = remainingSalatTimes.value.slice(0, itemsPerLoad);
  
    setTimeout(() => {
      renderedSalatTimes.value = [...renderedSalatTimes.value, ...itemsToAdd];
      if (renderedSalatTimes.value.length >= props.monthlySalatTimes.length) {
        allItemsLoaded.value = true;
      }
      isLoading.value = false; 
    }, 1000); 
  };
  
  const remainingSalatTimes = computed(() => props.monthlySalatTimes.slice(renderedSalatTimes.value.length));
  
  watch(() => props.monthlySalatTimes, (newValue) => {
    renderedSalatTimes.value = newValue.slice(0, itemsPerLoad);
    allItemsLoaded.value = newValue.length <= itemsPerLoad;
  }, { immediate: true });
  </script>
  
  <style scoped>
  .bg-white {
    height: 580px;
  }
  .p-6 .space-y-6 {
    height: 400px;
  }
  
  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .blur {
    filter: blur(8px);
  }
  </style>
  