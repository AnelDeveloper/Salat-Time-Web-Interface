<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-6">
      <div class="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 salat-container">
        <div class="flex items-center justify-between mb-8 space-x-4">
          <div class="flex-grow">
            <LocationSelector @location-selected="updateLocation"/>
          </div>
          <div class="flex-grow">
            <DateSelector @date-selected="updateDate"/>
          </div>
        </div>
        <div class="salat-times-container">
          <SalatTimesDisplay :selectedLocationId="selectedLocation" :selectedDate="selectedDate"  :selectedYear="selectedYear" :selectedMonth="selectedMonth"/>
        </div>
        <div v-if="selectedLocation && selectedDate" class="flex justify-between mt-8">
          <MonthlySalatTimes :selectedLocationId="selectedLocation" :selectedYear="selectedYear" :selectedMonth="selectedMonth" />
          <RamadanTimetable :locationId="selectedLocation" :year="selectedYear" />
        </div>
        <div v-else class="space"></div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, computed } from 'vue';
  import DateSelector from '../../components/Date/DateSelector.vue';
  import LocationSelector from '../../components/Location/LocationSelector.vue';
  import SalatTimesDisplay from '../../components/SalatTimes/SalatTimesDisplay.vue'; 
  import MonthlySalatTimes from '../../components/MonthlySalat/MonthlySalatTimes.vue';
  import RamadanTimetable from '../../components/RamadanTime/RamadanTimetable.vue'; 
  
  export default {
    name: "HomePage",
    components: {
      DateSelector,
      LocationSelector,
      SalatTimesDisplay, 
      MonthlySalatTimes,
      RamadanTimetable,
    },
    setup() {
      const selectedDate = ref('');
      const selectedLocation = ref('');
      const selectedYear = computed(() => selectedDate.value.split('-')[0]);
      const selectedMonth = computed(() => selectedDate.value.split('-')[1]);
  
      const updateDate = (date: string) => {
        selectedDate.value = date;
      };
  
      const updateLocation = (locationId: string) => {
        selectedLocation.value = locationId;
      };
  
      return {
        selectedDate,
        selectedLocation,
        updateDate,
        updateLocation,
        selectedYear,
        selectedMonth,
      };
    },
  };
  </script>
  
  <style scoped>
  .salat-times-container, .monthly-salat-times-container, .ramadan-timetable-container {
    min-height: 350px; 
    flex-direction: column;
    justify-content: center; 
    align-items: center; 
  }
  .salat-times-container {
  display: flex;
  justify-content: center; 
  align-items: center; 

}
  .space {
    height: 70px;
  }
  .flex-1 {
    flex: 1; 
    max-width: calc(50% - 2rem) !important; 
  }

  .salat-container{
    max-width: 500px;
  }
  </style>
  