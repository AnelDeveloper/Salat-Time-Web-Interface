<template>
    <div class="monthly-modal">
      <button @click="showModal = true" class="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-700">
        {{ $t('showMonthly') }}
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
  import MonthlySalatTimesModal from './Modal/MonthlySalatTimesModal.vue';
  import apiClient from '../../Api/Api';

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
        console.log(props.selectedLocationId, props.selectedMonth, props.selectedYear)

        if (!props.selectedLocationId || !props.selectedYear || !props.selectedMonth) return;
  
        try {
          const response = await apiClient.get(`/api/monthly-salat-times`, {
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
  
      watch(() => [props.selectedLocationId, props.selectedYear, props.selectedMonth], fetchMonthlySalatTimes);
  
      onMounted(fetchMonthlySalatTimes);
  
      return { monthlySalatTimes, showModal };
    },
  };
  </script>
  