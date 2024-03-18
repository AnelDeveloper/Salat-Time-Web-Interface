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
  import { ref, watch, onMounted, computed } from 'vue';
  import MonthlySalatTimesModal from './Modal/MonthlySalatTimesModal.vue';
  import apiClient from '../../Api/Api';
  
  export default {
    name: 'MonthlySalatTimes',
    components: {
      MonthlySalatTimesModal,
    },
    props: ['selectedLocationId', 'selectedYear', 'selectedMonth'],
  
    setup(props) {
      const monthlySalatTimes = ref([]);
      const showModal = ref(false);
      
      const {currentYear, currentMonth} = (() => {
        const now = new Date();
        return {
          currentYear: now.getFullYear().toString(),
          currentMonth: ('0' + (now.getMonth() + 1)).slice(-2)};
        })();
        
        const selectedYear = computed(() => props.selectedYear || currentYear);
        const selectedMonth = computed(() => props.selectedMonth || currentMonth);

  
      const fetchMonthlySalatTimes = async () => {
        console.log(props.selectedLocationId, selectedMonth.value, selectedYear.value)
  
        if (!props.selectedLocationId) return;
  
        try {
          const response = await apiClient.get(`/api/monthly-salat-times`, {
            params: {
              locationId: props.selectedLocationId,
              year: selectedYear.value,
              month: selectedMonth.value,
            },
          });
          monthlySalatTimes.value = response.data;
        } catch (error) {
          console.error('Error fetching monthly Salat times:', error);
        }
      };
  
      watch([() => props.selectedLocationId, selectedYear, selectedMonth], fetchMonthlySalatTimes, { immediate: true });
    
      return { monthlySalatTimes, showModal };
    },
  };
  </script>
  
  