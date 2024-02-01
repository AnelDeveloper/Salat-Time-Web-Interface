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
    display: flex; /* Omogućava fleksibilno raspoređivanje zaglavlja */
    justify-content: space-between; /* Razdvaja "Tip" i "Datum" */
    margin-bottom: 10px; /* Dodaje razmak između zaglavlja i liste */
  }
  
  .header-tip, .header-datum {
    font-weight: bold; /* Čini tekst zaglavlja istaknutijim */
    padding: 5px 10px; /* Dodaje unutrašnji prostor */
  }
  
  ul {
    list-style-type: none; /* Uklanja znakove za listu */
    padding: 0; /* Uklanja padding */
    margin: 0; /* Uklanja margin */
  }
  
  li {
    background-color: #fff; /* Postavlja belu pozadinu za svaku stavku liste */
    margin: 10px 0; /* Dodaje vertikalni prostor između stavki */
    padding: 10px; /* Dodaje padding unutar svake stavke */
    border-radius: 5px; /* Zaobljava ivice */
    box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Dodaje blagu senku za dubinu */
    display: flex; /* Omogućava fleksibilno raspoređivanje sadržaja */
    justify-content: space-between; /* Razdvaja datum i tip odsustva */
    align-items: center; /* Vertikalno centriranje sadržaja */
    font-size: 16px; /* Postavlja veličinu fonta */
  }
  
  /* Stilizacija za datum */
  .date {
    font-weight: bold; /* Čini datum istaknutijim */
  }
  
  /* Stilizacija za tip odsustva */
  .tip-odsustva {
    background-color: #007bff; /* Plava pozadina */
    color: white; /* Bela boja teksta */
    padding: 5px 10px; /* Dodaje unutrašnji prostor */
    border-radius: 15px; /* Zaobljava ivice */
    font-size: 14px; /* Malo smanjuje veličinu fonta za tip odsustva */
  }
  
  /* Opciono: stilizacija za hover efekat */
  li:hover {
    background-color: #f9f9f9; /* Svetlija pozadina pri prelasku mišem */
  }
  </style>
  