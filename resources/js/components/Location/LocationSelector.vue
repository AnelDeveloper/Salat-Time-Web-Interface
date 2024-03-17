<template>
    <div class="relative date-selector">
      <select v-model="selectedLocationId" @change="emitLocation" class="block appearance-none w-full bg-white border border-gray-300 px-4 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-indigo-300 transition duration-150 ease-in-out">
        <option disabled value="">Select a location</option>
        <option v-for="location in locations" :key="location.id" :value="location.id">
          {{ location.name }}
        </option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'LocationSelector',
    data() {
      return {
        selectedLocationId: '',
        locations: [],
      };
    },

    mounted() {
      this.fetchLocations();
    },

    methods: {
      async fetchLocations() {
        try {
          const response = await axios.get('http://localhost:8000/api/locations');
          this.locations = response.data;
        } catch (error) {
          console.error('Failed to fetch locations:', error);
        }
      },
      emitLocation() {
        this.$emit('locationSelected', this.selectedLocationId);
      },
    },
  };
  </script>
  
  
  <style scoped>
  .select {
    /* Tailwind CSS for select input */
  }
  </style>
  