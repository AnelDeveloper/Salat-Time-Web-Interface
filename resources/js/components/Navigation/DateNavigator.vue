<template>
    <div class="date-navigator">
      <button @click="emitChange(-1)">← Previous Day</button>
      <button @click="emitChange(1)">Next Day →</button>
    </div>
  </template>
  
  <script setup>
  import { defineEmits } from 'vue';
  
  const emit = defineEmits(['changeDay']);
  
  const emitChange = (change) => {
    emit('changeDay', change);
  };
  </script>
  
  <style scoped>
.date-navigator {
  display: flex;
  justify-content: center;
  gap: 10px; 
}

button {
  padding: 4px 8px; 
  font-size: 0.75rem; 
}


  </style>
  