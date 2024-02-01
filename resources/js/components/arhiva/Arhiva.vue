<template>
    <div class="archive-container">
      <div v-if="loading">Učitavanje...</div>
      <div v-else>
        <div class="archive-header">
          <span class="header-datum">Datum</span>
          <span class="header-tip">Tip</span>
        </div>
        <ul>
          <li v-for="item in arhivaData" :key="item.id">
            <span class="date">{{ item.pocetni_datum }} - {{ item.krajnji_datum }}:</span>
            <span class="tip-odsustva">{{ item.tip_odsustva }}</span>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from "vue";
  import axios from "axios";
  
  export default defineComponent({
    name: "Arhiva",
    setup() {
      const arhivaData = ref([]);
      const loading = ref(true);
  
      const getArhiva = async () => {
        loading.value = true;
        try {
          const response = await axios.get('http://localhost:8000/api/arhiva');
          arhivaData.value = response.data;
        } catch (error) {
          console.error("There was an error fetching the archive data:", error);
        } finally {
          loading.value = false;
        }
      };
  
      onMounted(async () => {
        await getArhiva();
      });
  
      return { arhivaData, loading };
    },
  });
  </script>
  
  
  <style scoped>
  .archive-container {
    background-color: #f5f5f5; 
    padding: 20px;
    border-radius: 8px; 
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 80%; 
    max-width: 600px; 
    margin: 20px auto;
  }
  
  .archive-header {
    display: flex; 
    justify-content: space-between; 
    margin-bottom: 10px; 
  }
  
  .header-tip, .header-datum {
    font-weight: bold; 
    padding: 5px 10px; 
  }
  
  ul {
    list-style-type: none; 
    padding: 0;
    margin: 0; 
  }
  
  li {
    background-color: #fff;
    margin: 10px 0; 
    padding: 10px; 
    border-radius: 5px; 
    box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
    display: flex; 
    justify-content: space-between;
    align-items: center; 
    font-size: 16px; 
  }
  

  .date {
    font-weight: bold;
  }
  
  
  .tip-odsustva {
    background-color: #007bff; 
    color: white; 
    padding: 5px 10px;
    border-radius: 15px; 
    font-size: 14px; 
  }
  

  li:hover {
    background-color: #f9f9f9; 
  }
  </style>
  