<template>
  <div class="monthly-modal">
    <button @click="showModal = true" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
      Show Monthly Salat Times
    </button>
    <MonthlySalatTimesModal 
      :isVisible="showModal" 
      @update:isVisible="showModal = $event"
      :monthlySalatTimes="monthlySalatTimes"
      class="monthly-salat-times-modal" 
    />
  </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, watch, onMounted } from 'vue';
  import MonthlySalatTimesModal from './Modal/MonthlySalatTimesModal.vue'
  
  export default {
    name: 'MonthlySalatTimes',
    components: {
      MonthlySalatTimesModal 
    },
    props: ['selectedLocationId', 'selectedYear', 'selectedMonth'],
  
    setup(props) {
      const monthlySalatTimes = ref([]);
      const showModal = ref(false);
  
      const fetchMonthlySalatTimes = async () => {
        if (!props.selectedLocationId || !props.selectedYear || !props.selectedMonth) return;
  
        try {
          const response = await axios.get('http://localhost:8000/api/monthly-salat-times', {
            params: {
              locationId: props.selectedLocationId,
              year: props.selectedYear,
              month: props.selectedMonth,
            },
          });
          monthlySalatTimes.value = response.data;
        } catch (error) {
          console.error('Error fetching monthly Salat times:', error);
        }
      };
  
      const showMonthlySalatTimes = () => {
        showModal.value = true; 
      };
  
      watch(() => [props.selectedLocationId, props.selectedYear, props.selectedMonth], fetchMonthlySalatTimes);
  
      onMounted(fetchMonthlySalatTimes);
  
      return { monthlySalatTimes, showModal };
    },
  };
  </script>
  
  <style scoped>
  .monthly-salat-times-modal {
    /* Add padding to the top of the modal to ensure content visibility */
    padding-top: 20px;
  }
  </style>
  