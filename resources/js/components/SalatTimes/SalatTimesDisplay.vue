<template>
  <LoadingState v-if="isLoading" />
  <div v-else-if="salatTimes.length > 0" class="mt-8 flex flex-wrap justify-center">
    <div v-for="time in salatTimes" :key="time.id" class="salat-time-card">
      <h3 class="salat-day">Day: {{ formatDate(time.date) }}</h3>
      <div class="salat-time-detail">Sunrise: <span>{{ time.sunrise }}</span></div>
      <div class="salat-time-detail">Fajr: <span>{{ time.fajr }}</span></div>
      <div class="salat-time-detail">Dhuhr: <span>{{ time.dhuhr }}</span></div>
      <div class="salat-time-detail">Asr: <span>{{ time.asr }}</span></div>
      <div class="salat-time-detail">Maghrib: <span>{{ time.maghrib }}</span></div>
      <div class="salat-time-detail">Isha: <span>{{ time.isha }}</span></div>
      <DateNavigator @changeDay="navigateDays" />
    </div>
  </div>
  <div v-else class="no-salat-times">
    <p>No Salat times available for the selected location and date.</p>
  </div>
</template>

  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  import axios from 'axios';
  import LoadingState from '../Spinner/LoadingState.vue';
  import DateNavigator from '../Navigation/DateNavigator.vue';
  
  const props = defineProps(['selectedLocationId', 'selectedDate']);
  const salatTimes = ref([]);
  const isLoading = ref(false);

  const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};


const selectedDate = ref(props.selectedDate || new Date().toISOString().split('T')[0]);

const navigateDays = (change) => {
  const currentDate = new Date(selectedDate.value);
  currentDate.setDate(currentDate.getDate() + change);
  selectedDate.value = currentDate.toISOString().split('T')[0];
  fetchSalatTimes(); 
};

const fetchSalatTimes = async () => {
  if (!props.selectedLocationId || !selectedDate.value) return;

  isLoading.value = true;

  try {
    const response = await axios.get('http://localhost:8000/api/salat-times', { 
      params: { locationId: props.selectedLocationId, date: selectedDate.value } 
    });
    salatTimes.value = response.data;
  } catch (error) {
    console.error("Failed to fetch Salat times:", error);
    salatTimes.value = [];
  } finally {
    isLoading.value = false;
  }
};

watch([() => props.selectedLocationId, selectedDate], fetchSalatTimes, { immediate: true });

  
  onMounted(() => {
    fetchSalatTimes();
  });
  </script>
  
  <style scoped>
  .salat-time-card {
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    min-width: 430px;
    max-width: 800px;
  }
  
  .salat-day{
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }
  
  .salat-time-detail {
    display: flex;
    justify-content: space-between; 
    font-size: 1rem;
    color: #4B5563;
    margin-bottom: 0.5rem;
  }
  
  .salat-time-detail span {
    font-weight: normal;
  }
  
  .salat-time-detail .time {
    font-weight: bold;
    text-align: right; 
  }
  
  .no-salat-times {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #374151;

}
  
  @media (max-width: 768px) {
    .salat-time-card {
      width: calc(100% / 2 - 2rem);
    }
  }
  
  @media (max-width: 480px) {
    .salat-time-card {
      width: 100%;
      margin: 1rem 0;
    }
  }
  </style>
  