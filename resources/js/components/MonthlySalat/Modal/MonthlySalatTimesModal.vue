<template>
  <div v-if="isVisible" class="fixed inset-0 flex justify-center items-center z-50">
    <div class="bg-emerald-100 overflow-y-auto h-full w-full">
      <div class="flex justify-center items-center h-full">
        <div class="modal-container bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 p-4 mt-8">
          <div class="flex justify-between items-center p-5 pr-0 rounded-t border-b">
            <h2 class="text-xl font-semibold">{{ $t('monthlySalat') }}</h2> 
            <button @click="close" class="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 rounded">
              X
            </button>
          </div>
          <div class="table-header">
            <div class="text-sm md:text-base font-semibold w-full text-gray-800 bg-gradient-to-r from-gray-50 to-gray-200 py-2 px-4 rounded-lg shadow header">
              <span class="header-item">{{ $t('date') }}</span>
              <span class="header-item">{{ $t('sunrise') }}</span>
              <span class="header-item">{{ $t('fajr') }}</span>
              <span class="header-item">{{ $t('dhuhr') }}</span>
              <span class="header-item">{{ $t('asr') }}</span>
              <span class="header-item">{{ $t('maghrib') }}</span>
              <span class="header-item">{{ $t('isha') }}</span>
            </div>
          </div>
          <div class="table-content overflow-y-auto">
            <Table :times="monthlySalatTimes" />
          </div>
          <div class="footer flex justify-end p-4 border-t">
            <PdfDownloader :data="monthlySalatTimes" fileName="Monthly-Salat-Times.pdf" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  
  <script setup>
  import { ref } from 'vue';
  import Table from '../../Table/Table.vue';
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
  
 const close = () => {
  emit('update:isVisible', false);
  renderedSalatTimes.value = []; 
  allItemsLoaded.value = false;
};
  


  </script>
  
  <style scoped>


.bg-white {
  max-height: 90vh;
  overflow-y: auto;
  width: 65%; 
  max-width: 90vw; 
}
  
 
  @media (min-width: 668px) {
    .bg-white {
      max-width: 90vw; 
    }
  }
  
  .p-4 {
    padding: 1rem;
  }
  
  .modal-content {
    padding-bottom: 1rem;
  }

  .modal-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 90vh;
  width: 65%;
  max-width: 90vw;
  overflow: hidden; 
}

.header, .item {
  display: flex;
  justify-content: space-between;
  padding: 4px 10px; 
}
.table-header{
  padding: 10px;
}


.table-content {
  max-height: calc(90vh - 160px);
  overflow-y: auto; 
}

.footer {
  border-top: 1px solid #ccc; 
  padding: 10px 0; 
}
.header, .item {
  display: flex;
  justify-content: space-between;
}

.header-item, .item-detail {
  flex: 1;
  padding: 0 6px; 
  box-sizing: border-box; 
}

.header-item:first-child, .item-detail:first-child,
.header-item:last-child, .item-detail:last-child {
  padding: 0 0px; 
}
.header-item:nth-child(2), .item-detail:nth-child(2) {
  margin-left: 50px;

}
.header-item:nth-child(3), .item-detail:nth-child(3) {
  margin-left: 0px;

}
.header-item:nth-child(4), .item-detail:nth-child(4) {
  margin-left: 10px;

}
.header-item:nth-child(5), .item-detail:nth-child(5) {
  margin-left: 0px;

}
.header-item:nth-child(6), .item-detail:nth-child(6) {
  margin-right: 10px;

}
.header-item:nth-child(7), .item-detail:nth-child(7) {
  margin-right: 0px;

}

@media (max-width: 1280px) {
  .header-item:first-child, .item-detail:first-child,
.header-item:last-child, .item-detail:last-child {
  padding: 0 0px; 
}
.header-item:nth-child(2), .item-detail:nth-child(2) {
  margin-left: 30px;

}
.header-item:nth-child(3), .item-detail:nth-child(3) {
  margin-left: 0px;

}
.header-item:nth-child(4), .item-detail:nth-child(4) {
  margin-left: 0px;

}
.header-item:nth-child(5), .item-detail:nth-child(5) {
  margin-left: 0px;

}
.header-item:nth-child(6), .item-detail:nth-child(6) {
  margin-right: 10px;

}
.header-item:nth-child(7), .item-detail:nth-child(7) {
  margin-right: 0px;

}

  }
  </style>
  