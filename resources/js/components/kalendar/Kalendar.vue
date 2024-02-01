<template>
    <div class="container">
      <div v-if="isLoading">Učitavanje...</div>
      <div v-else>
        <div class="current-month">
          {{ currentMonth }}
          <svg @click="goToArchive" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="archive-icon" viewBox="0 0 16 16">
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm2 1v10h12V3H2zm11 2a.5.5 0 0 0 0 1H3a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1H3a.5.5 0 0 0 0-1h10z"/>
          </svg>
        </div>
        <div class="calendar">
          <div v-for="day in days" :key="day.date" :class="['calendar-day', {'weekend': day.isWeekend, 'odsustvo': isOdsustvo(day.date)}]">
            <span>{{ getDayFromDate(day.date) }}</span>
            <span v-if="isOdsustvo(day.date)" class="odsustvo-text">{{ isOdsustvo(day.date) }}</span>
          </div>
        </div>
        <div class="buttons">
          <button class="first-button" @click="openOdsustvoModal">Registruj Odsustvo</button>
          <button class="second-button" @click="sacuvajUArhivu">Sačuvaj u arhivu</button>
        </div>
        <RegistracijaModal  :isOdsustvoModalOpen="isOdsustvoModalOpen" @close="isOdsustvoModalOpen = false" />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from "vue";
  import axios from "axios";
  import RegistracijaModal from "./modals/RegistracijaModal.vue";
  import router from '../../services/router';
  
  export default defineComponent({
    name: "Kalendar",
    components: {
      RegistracijaModal,
    },
    setup() {
      const days = ref([]);
      const currentMonth = ref("");
      const isOdsustvoModalOpen = ref(false);
      const odsustva = ref([]);
      const isLoading = ref(true);
  
      const sacuvajUArhivu = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/arhiviraj-odsustva');
    
    await fetchOdsustva();
    await fetchKalendar();
    console.log(response.data.message);


  } catch (error) {
    console.error(error);
  }
};

  
      const fetchOdsustva = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/odsustva");
          odsustva.value = response.data;
        } catch (error) {
          console.error("Greška prilikom dohvatanja podataka o odsustvima:", error);
        } finally {
          isLoading.value = false;
        }
      };
  
      const fetchKalendar = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/kalendar");
          days.value = response.data;
          currentMonth.value = getCurrentMonth();
        } catch (error) {
          console.error("Greška prilikom dohvatanja podataka o kalendaru:", error);
        } finally {
          isLoading.value = false;
        }
      };
  
      onMounted(async () => {
        await fetchOdsustva();
        await fetchKalendar();
      });
  
      const getDayFromDate = (dateString) => {
        const date = new Date(dateString);
        return date.getDate();
      };

      const openOdsustvoModal = () => {
        console.log("Button clicked"); 
        isOdsustvoModalOpen.value = true;
      };
  
      const getCurrentMonth = () => {
        const options = { month: "long" };
        return new Date().toLocaleDateString(undefined, options);
      };
  
      const goToArchive = () => {
        router.push({ path: '/arhiva' });
      };

      const isOdsustvo = (dateString) => {
        const date = new Date(dateString);
        date.setHours(0, 0, 0, 0); 

  const odsustvoObj = odsustva.value.find((odsustvo) => {
    const odsustvoStartDate = new Date(odsustvo.pocetni_datum);
    odsustvoStartDate.setHours(0, 0, 0, 0); 
    let odsustvoEndDate = new Date(odsustvo.krajnji_datum || odsustvo.pocetni_datum);
    odsustvoEndDate.setHours(23, 59, 59, 999); 

    return date >= odsustvoStartDate && date <= odsustvoEndDate;
  });

  return odsustvoObj ? odsustvoObj.tip_odsustva : null;
};

  
      return {
        days,
        getDayFromDate,
        currentMonth,
        isOdsustvoModalOpen,
        openOdsustvoModal,
        isOdsustvo,
        sacuvajUArhivu,
        isLoading,
        goToArchive
      };
    },
  });
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 1000px;
    margin: auto;
  }
  
  .calendar {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: center;
  }
  
  .calendar-day {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(14.28% - 10px);
    background-color: #f0f0f0;
    border-radius: 5px;
    font-size: 16px;
    min-height: 100px;
  }
  
  .calendar-day > span:first-child {
    z-index: 2;
  }
  
  .archive-icon {
    float: right;
    cursor: pointer;
    margin-right: 10px;
  }
  
  .odsustvo-text {
    position: absolute;
    bottom: 5px;
    left: 5px;
    color: #333;
    font-size: 0.7em;
    padding: 2px 4px;
    border-radius: 3px;
    z-index: 1;
  }
  
  .current-month {
    width: 100%;
    text-align: center;
    font-size: 20px;
    margin: 20px 0;
  }
  
  .weekend {
    background-color: #ffdddd;
    color: red;
    font-weight: bold;
  }
  
  .odsustvo {
    background-color: #ffc107;
    color: white;
    font-weight: bold;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
  }
  
  .first-button, .second-button {
    color: white;
    background-color: #007bff !important;
    border: 1px solid #007bff;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .second-button {
    background-color: #c7c7c7 !important;
    border: 1px solid #adadad;
  }
  
  .first-button:hover {
    background-color: #0056b3;
  }
  
  button {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }
  
  button[color="secondary"] {
    background-color: #007bff;
    color: white;
  }
  
  button[color="error"] {
    background-color: #dc3545;
    color: white;
  }
  </style>
  