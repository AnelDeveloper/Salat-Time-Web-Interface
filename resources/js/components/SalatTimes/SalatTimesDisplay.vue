<template>
    <div v-if="salatTimes.length > 0" class="mt-8 w-full max-w-md bg-white rounded-lg shadow-md">
      <div v-for="time in salatTimes" :key="time.id" class="p-4 border-b last:border-b-0">
        <p class="text-lg font-semibold">Fajr: <span class="font-normal">{{ time.fajr }}</span></p>
        <p class="text-lg font-semibold">Dhuhr: <span class="font-normal">{{ time.dhuhr }}</span></p>
        <p class="text-lg font-semibold">Asr: <span class="font-normal">{{ time.asr }}</span></p>
        <p class="text-lg font-semibold">Maghrib: <span class="font-normal">{{ time.maghrib }}</span></p>
        <p class="text-lg font-semibold">Isha: <span class="font-normal">{{ time.isha }}</span></p>
      </div>
    </div>
    <div v-else class="mt-8">
      <p>No Salat times available for the selected location and date.</p>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'SalatTimesDisplay',
    props: ['selectedLocationId', 'selectedDate'],
    data() {
      return {
        salatTimes: [],
      };
    },
    watch: {
      selectedLocationId(newVal, oldVal) {
        if (newVal !== oldVal) this.fetchSalatTimes();
      },
      selectedDate(newVal, oldVal) {
        if (newVal !== oldVal) this.fetchSalatTimes();
      },
    },
    methods: {
      fetchSalatTimes() {
        if (!this.selectedLocationId || !this.selectedDate) return;
  
        axios.get('http://localhost:8000/api/salat-times', { params: 
            { locationId: this.selectedLocationId, date: this.selectedDate } 
        })
          .then(response => {
            this.salatTimes = response.data;
            console.log(this.salatTimes, "evo ga")
          })
          .catch(error => {
            console.error('Error fetching Salat times:', error);
            this.salatTimes = [];
          });
      },
    },
    mounted() {
      this.fetchSalatTimes();
    },
  };
  </script>
  
  <style scoped>
  .salat-time {
    /* Your styles here */
  }
  </style>
  