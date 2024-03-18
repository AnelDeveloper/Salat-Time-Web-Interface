<template>
    <LoadingState v-if="isLoading" />
    <div v-else-if="salatTimes.length > 0" class="mt-8 flex flex-wrap justify-center">
      <div v-for="time in salatTimes" :key="time.id" class="salat-time-card">
        <h3 class="salat-day">Day: {{ formatDate(time.date) }}</h3>
        <div class="salat-time-detail">Fajr: <span>{{ time.fajr }}</span></div>
        <div class="salat-time-detail">Dhuhr: <span>{{ time.dhuhr }}</span></div>
        <div class="salat-time-detail">Asr: <span>{{ time.asr }}</span></div>
        <div class="salat-time-detail">Maghrib: <span>{{ time.maghrib }}</span></div>
        <div class="salat-time-detail">Isha: <span>{{ time.isha }}</span></div>
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
  
  const props = defineProps(['selectedLocationId', 'selectedDate']);
  const salatTimes = ref([]);
  const isLoading = ref(false);

  const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};


  
  const fetchSalatTimes = async () => {
    if (!props.selectedLocationId || !props.selectedDate) return;
  
    isLoading.value = true;
  
    try {
      const response = await axios.get('http://localhost:8000/api/salat-times', { 
        params: { locationId: props.selectedLocationId, date: props.selectedDate } 
      });
      salatTimes.value = response.data;
    } catch (error) {
      salatTimes.value = [];
    } finally {
      isLoading.value = false;
    }
  };
  
  watch(() => [props.selectedLocationId, props.selectedDate], () => {
    fetchSalatTimes();
  }, { immediate: true });
  
  onMounted(() => {
    fetchSalatTimes();
  });
  </script>
  
  <style scoped>
  .salat-time-card {
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
  }
  
  .salat-day {
    font-size: 1.25rem;
    color: #374151;
    margin-bottom: 0.5rem;
  }
  
  .salat-time-detail {
    font-size: 1rem;
    color: #4B5563;
  }
  
  .salat-time-detail span {
    font-weight: bold;
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
  