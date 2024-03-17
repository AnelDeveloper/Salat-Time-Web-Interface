<template>
    <div>
      <button @click="showModal = true" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ramadan-button">
    Ramadan Timetable
      </button>
      <RamadanTimeModal 
  :isVisible="showModal" 
  @update:isVisible="showModal = $event"
  :timetable="ramadanTimetable"
  class="ramadan-timetable-modal" 
/>

    </div>
  </template>
  
  <script>
  import { ref, watch, onMounted } from 'vue';
  import axios from 'axios';
  import RamadanTimeModal from './Modal/RamadanTimeModal.vue';
  
  export default {
    name: 'RamadanTimetable',
    components: {
        RamadanTimeModal,
    },
    props: {
      locationId: {
        type: [String, Number],
        required: true,
      },
      year: {
        type: String,
        required: true,
      },
    },


    setup(props) {
      const ramadanTimetable = ref([]);
      const showModal = ref(false);
  
      const fetchRamadanTimetable = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/ramadan-timetable', {
            params: {
              locationId: props.locationId,
              year: props.year,
            },
          });
          ramadanTimetable.value = response.data;
        } catch (error) {
          console.error('Error fetching Ramadan timetable:', error);
        }
      };
  
      onMounted(fetchRamadanTimetable);
  
      watch(() => [props.locationId, props.year], fetchRamadanTimetable);
  
      return {
        ramadanTimetable,
        showModal,
      };
    },
  };
  </script>
  
  <style scoped>
 
</style>