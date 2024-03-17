<template>
    <div v-if="isVisible" class="fixed inset-0 flex justify-center items-center z-50">
      <div class="bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full">
        <div class="flex justify-center items-center h-full">
          <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 p-4 mt-8">
            <div class="flex justify-between items-center p-5 rounded-t border-b">
              <h2 class="text-xl font-semibold">Monthly Salat Times</h2>
              <button @click="close" class="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 rounded">
                X
              </button>
            </div>
  
            <div class="p-6 space-y-6 overflow-y-auto">
              <div class="flex justify-between text-sm p-2 font-medium">
                <span>Date</span>
                <span>Fajr</span>
                <span>Dhuhr</span>
                <span>Asr</span>
                <span>Maghrib</span>
                <span>Isha</span>
              </div>
              <template v-if="renderedSalatTimes.length > 0">
                <RecycleScroller :items="renderedSalatTimes" :item-size="50" class="recycle-scroller">
                  <template v-slot="{ item }">
                    <div class="flex justify-between text-sm p-2">
                      <span>{{ item.date }}</span>
                      <span>{{ item.fajr }}</span>
                      <span>{{ item.dhuhr }}</span>
                      <span>{{ item.asr }}</span>
                      <span>{{ item.maghrib }}</span>
                      <span>{{ item.isha }}</span>
                    </div>
                  </template>
                </RecycleScroller>
              </template>
              <div v-else>
                <p>No Salat times available for the selected month and location.</p>
              </div>
              <div class="flex justify-center"> <!-- Center the Read More button -->
                <button v-if="!allItemsLoaded" @click="loadMore" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Read More
                </button>
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
  import { RecycleScroller } from 'vue3-virtual-scroller';
  import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css';
  
  export default {
    name: 'MonthlySalatTimesModal',
    components: {
      RecycleScroller,
    },
    props: {
      isVisible: Boolean,
      monthlySalatTimes: {
        type: Array,
        default: () => [],
      },
    },
    emits: ['update:isVisible'],
    data() {
      return {
        renderedSalatTimes: [],
        allItemsLoaded: false,
        itemsPerLoad: 10,
      };
    },
    computed: {
      remainingSalatTimes() {
        return this.monthlySalatTimes.slice(this.renderedSalatTimes.length);
      },
    },
    methods: {
      close() {
        this.$emit('update:isVisible', false);
      },
      printTimes() {
        window.print();
      },
      loadMore() {
        const itemsToAdd = this.remainingSalatTimes.slice(0, this.itemsPerLoad);
        this.renderedSalatTimes = [...this.renderedSalatTimes, ...itemsToAdd];
        if (this.remainingSalatTimes.length <= this.itemsPerLoad) {
          this.allItemsLoaded = true;
        }
      },
    },
    watch: {
      monthlySalatTimes: {
        immediate: true,
        handler(newValue) {
          this.renderedSalatTimes = newValue.slice(0, this.itemsPerLoad);
          this.allItemsLoaded = newValue.length <= this.itemsPerLoad;
        },
      },
    },
  };
  </script>
  
  <style scoped>
  .bg-white {
    height: 580px;
  }
  .p-6 .space-y-6 {
    height: 400px;
  }
  </style>
  