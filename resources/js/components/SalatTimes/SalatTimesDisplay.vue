<template>
  <LoadingState v-if="isLoading" />
  <div v-else-if="salatTimeForSelectedDate" class="mt-8 flex flex-wrap justify-center">
    <div class="salat-time-card">
      <h3 class="salat-day">Day: {{ formatDate(salatTimeForSelectedDate.date) }}</h3>
      <div class="salat-time-detail">Sunrise: <span>{{ salatTimeForSelectedDate.sunrise }}</span></div>
      <div class="salat-time-detail">Fajr: <span>{{ salatTimeForSelectedDate.fajr }}</span></div>
      <div class="salat-time-detail">Dhuhr: <span>{{ salatTimeForSelectedDate.dhuhr }}</span></div>
      <div class="salat-time-detail">Asr: <span>{{ salatTimeForSelectedDate.asr }}</span></div>
      <div class="salat-time-detail">Maghrib: <span>{{ salatTimeForSelectedDate.maghrib }}</span></div>
      <div class="salat-time-detail">Isha: <span>{{ salatTimeForSelectedDate.isha }}</span></div>
      <DateNavigator @changeDay="navigateDays" />
    </div>
  </div>
  <div v-else class="no-salat-times">
    <p>No Salat times available for the selected location and date.</p>
  </div>
</template>

  
<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import LoadingState from '../Spinner/LoadingState.vue';
import DateNavigator from '../Navigation/DateNavigator.vue';
import apiClient from '../../Api/Api';


const props = defineProps(['selectedLocationId', 'selectedDate']);
const monthlySalatTimes = ref([]);
const isLoading = ref(false);

const selectedDate = ref(props.selectedDate || new Date().toISOString().split('T')[0]);

const currentMonthYear = computed(() => {
  const year = selectedDate.value.substring(0, 4);
  const month = selectedDate.value.substring(5, 7);
  return `${year}-${month}`;
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const salatTimeForSelectedDate = computed(() => {
  return monthlySalatTimes.value.find(time => time.date === selectedDate.value);
});


const navigateDays = (change) => {
  const currentDate = new Date(selectedDate.value);
  currentDate.setDate(currentDate.getDate() + change);
  selectedDate.value = currentDate.toISOString().split('T')[0];
};

const fetchMonthlySalatTimes = async () => {
  if (!props.selectedLocationId && !props.selectedDate) {
    return;
  }

  isLoading.value = true;
  try {
    const response = await apiClient.get(`/api/monthly-salat-times`, {
      params: {
        locationId: props.selectedLocationId,
        year: currentMonthYear.value.substring(0, 4),
        month: currentMonthYear.value.substring(5, 7)
      }
    });
    monthlySalatTimes.value = response.data.map(entry => ({ ...entry, monthYear: currentMonthYear.value }));
  } catch (error) {
    console.error("Failed to fetch Salat times:", error);
    monthlySalatTimes.value = [];
  } finally {
    isLoading.value = false;
  }
};

watch([() => props.selectedLocationId && props.selectedDate, currentMonthYear], fetchMonthlySalatTimes, { immediate: true });

watch(() => props.selectedDate, (newDate) => {
  selectedDate.value = newDate || new Date().toISOString().split('T')[0];
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