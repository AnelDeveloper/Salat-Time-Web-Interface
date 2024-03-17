<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-6">
    <div class="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
      <div class="flex items-center justify-between mb-8 space-x-4">
        <div class="flex-grow">
          <LocationSelector @location-selected="updateLocation"/>
        </div>
        <div class="flex-grow">
          <DateSelector @date-selected="updateDate"/>
        </div>
      </div>
      <div class="pt-4">
          <SalatTimesDisplay :selectedLocationId="selectedLocation" :selectedDate="selectedDate" />
        </div>
      <div class="flex pt-4 space-x-4  justify-between">
        <div class="flex-1">
          <MonthlySalatTimes :selectedLocationId="selectedLocation" :selectedYear="selectedYear" :selectedMonth="selectedMonth" />
        </div>

        <div class="flex-1">
          <RamadanTimetable :locationId="selectedLocation" :year="selectedYear" />
        </div>
      </div>
    </div>
  </div>
</template>

  
  
  <script lang="ts">
  import { ref,computed  } from 'vue';
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
  .date-selector,
  .location-selector {
  }


  .flex-1 {
  flex: 1; /* Each child takes equal amount of space */
  max-width: calc(50% - 2rem) !important; /* Assuming 2rem is your desired space, adjust accordingly */
}
  </style>
  