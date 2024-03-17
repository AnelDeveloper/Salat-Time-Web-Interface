<template>
    <div v-if="isVisible" class="fixed inset-0 flex justify-center items-center z-50">
      <div class="bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full">
        <div class="flex justify-center items-center h-full">
          <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 p-4 mt-8">
            <div class="flex justify-between items-center p-5 rounded-t border-b">
              <h2 class="text-xl font-semibold">Ramadan Timetable (Hijri Dates)</h2>
              <button @click="close" class="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 rounded">
                X
              </button>
            </div>
  
            <div class="p-6 space-y-6 overflow-y-auto">
              <div class="flex justify-between text-sm p-2 font-medium">
                <span>Date (Hijri)</span>
                <span>Fajr</span>
                <span>Dhuhr</span>
                <span>Asr</span>
                <span>Maghrib</span>
                <span>Isha</span>
              </div>
              <template v-if="timetable.length > 0">
                <div v-for="time in timetable" :key="time.date" class="flex justify-between text-sm p-2">
                  <span>{{ time.date }}</span>
                  <span>{{ time.fajr }}</span>
                  <span>{{ time.dhuhr }}</span>
                  <span>{{ time.asr }}</span>
                  <span>{{ time.maghrib }}</span>
                  <span>{{ time.isha }}</span>
                </div>
              </template>
              <div v-else>
                <p>No Ramadan timetable available for the selected year and location.</p>
              </div>
            </div>
            <div class="flex justify-end mt-8">
              <button @click="printTimes" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RamadanTimetableModal',
    props: {
      isVisible: Boolean,
      timetable: {
        type: Array,
        default: () => [],
      },
    },
    emits: ['update:isVisible'],
    methods: {
      close() {
        console.log(this.timetable, "dasdasdasda")

        this.$emit('update:isVisible', false);
      },
      printTimes() {
        window.print();
      },
    },
  };
  </script>
  
  <style scoped>
  .bg-white {
    /* Adjust the modal height if necessary */
    height: auto;
  }
  .p-6 .space-y-6 {
    /* Adjust the content height if necessary */
    max-height: 400px;
    overflow-y: auto;
  }
  </style>
  