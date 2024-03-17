<template>
    <div class="date-selector">
      <input type="date" v-model="selectedDate" @change="emitDate"
       class="p-2 border rounded-md shadow-sm bg-white focus:ring focus:ring-opacity-50 focus:ring-indigo-300 transition duration-150 ease-in-out w-full">
    </div>
  </template>
  
  <script>
  export default {
    name: 'DateSelector',
    data() {
      return {
        selectedDate: new Date().toISOString().substr(0, 10),
      };
    },
    methods: {
      emitDate() {
        this.$emit('dateSelected', this.selectedDate);
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  