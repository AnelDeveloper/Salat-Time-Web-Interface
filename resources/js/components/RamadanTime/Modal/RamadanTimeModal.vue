<template>
    <div v-if="isVisible" class="fixed inset-0 flex justify-center items-center z-50">
      <div v-if="isLoading" class="loading-overlay">
        <LoadingState />
      </div>
      <div class="bg-blue-800 bg-opacity-75 overflow-y-auto h-full w-full">
        <div class="flex justify-center items-center h-full">
          <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 p-4 mt-8">
            <div class="flex justify-between items-center p-5 pr-0 rounded-t border-b">
              <h2 class="text-xl font-semibold">{{ $t('ramadanTimeTable') }}</h2>
              <button @click="close" class="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 rounded">
                X
              </button>
            </div>
            <Table :class="{ 'blur': isLoading }" :times="renderedTimetable" :allItemsLoaded="allItemsLoaded" :loadMore="loadMore"/>
            <div class="flex justify-end mt-8">
              <PdfDownloader :data="timetable" fileName="Ramadan-TimeTable.pdf" />
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
    timetable: {
      type: Array,
      default: () => [],
    },
  });
  
  const emit = defineEmits(['update:isVisible']);
  
  const renderedTimetable = ref([]);
  const allItemsLoaded = ref(false);
  const itemsPerLoad = 10;
  const isLoading = ref(false);
  
  const close = () => {
  emit('update:isVisible', false);
  renderedTimetable.value = []; 
  allItemsLoaded.value = false;
}

  
  const loadMore = () => {
  isLoading.value = true;
  setTimeout(() => {
    const currentLength = renderedTimetable.value.length;
    const itemsToAdd = props.timetable.slice(currentLength, currentLength + itemsPerLoad);

    renderedTimetable.value = [...renderedTimetable.value, ...itemsToAdd];

    if (renderedTimetable.value.length >= props.timetable.length) {
      allItemsLoaded.value = true;
    }

    isLoading.value = false;
  }, 1000);
}

  
  const remainingTimetable = computed(() => props.timetable.slice(renderedTimetable.value.length));
  
  watch(() => props.timetable, (newValue) => {
    renderedTimetable.value = newValue.slice(0, itemsPerLoad);
    allItemsLoaded.value = newValue.length <= itemsPerLoad;
  }, { immediate: true });
  </script>
  
  <style scoped>
  .bg-white {
    height: auto;
  }
  .p-6 .space-y-6 {
    max-height: 400px;
    overflow-y: auto;
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
  