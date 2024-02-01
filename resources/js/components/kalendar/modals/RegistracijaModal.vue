<template>
    <div class="modal" v-if="isOdsustvoModalOpen">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Registruj Odsustvo</h2>
        </div>
        <div class="modal-body">
          <div>
            <label for="tip_odsustva">Razlog odsustva:</label>
            <select  id="tip_odsustva" v-model="tip_odsustva">
              <option value="">Izaberite razlog odsustva</option>
              <option value="Bolovanje">Bolovanje</option>
              <option value="Godisnji Odmor">Godišnji Odmor</option>
            </select>
          </div>
          <VueDatePicker   class="inputs" v-model="selectedDates" range></VueDatePicker>
        </div>
        <div class="modal-footer">
          <button color="primary" @click="registrujOdsustvo">Registruj</button>
          <button color="error" @click="closeModal">Zatvori</button>
        </div>
      </div>
    </div>
  </template>

  
  <script>
  import { defineComponent, ref } from "vue";
  import axios from 'axios';
  import VueDatePicker from "vue3-datepicker";
  
  export default defineComponent({
    name: "RegistracijaModal",
    props: {
        isOdsustvoModalOpen: Boolean, 
    },
    data() {
      return {
        selectedDates: [],
        tip_odsustva: '',
        minDate: new Date(),
        maxDate: new Date(new Date().getFullYear() + 1, 11, 31),
      };
      
    },
    
    methods: {
        
            registrujOdsustvo() {

        if (!Array.isArray(this.selectedDates) || this.selectedDates.length === 0 || !this.selectedDates[0]) {
            console.error("Morate izabrati datum odsustva.");
            return;
        }

        let odsustvo = {
            pocetni_datum: this.selectedDates[0].toISOString().slice(0, 19).replace('T', ' '),
            krajnji_datum: this.selectedDates.length > 1 && this.selectedDates[1] ? this.selectedDates[this.selectedDates.length - 1].toISOString().slice(0, 19).replace('T', ' ') : this.selectedDates[0].toISOString().slice(0, 19).replace('T', ' '),
            tip_odsustva: this.tip_odsustva,
        };

        axios.post('http://localhost:8000/api/odsustva', odsustvo)
            .then(response => {
                console.log("Odsustvo je uspešno registrovano.");
                this.$emit('odsustvo-registered');
                this.closeModal(); 
                this.resetModal(); 
            })
            .catch(error => {
                console.error("Greška prilikom registracije odsustva:", error);
            });
    },

    closeModal() {
        this.$emit("close");
        this.resetModal();
    },
    resetModal() {
        this.selectedDates = [];
        this.tip_odsustva = '';
    },
}

  });
  </script>
  
  <style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  overflow-y: auto; 
}

.modal-content {
  background-color: #fff;
  width: 90%; 
  max-width: 500px;
  margin: 20px;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  animation: modalFadeIn 0.3s;
}

@keyframes modalFadeIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eaeaea;
}
.inputs{
    padding-top: 10px !important;
}

.modal-header h2 {
  margin: 0;
}

.modal-body {
  margin-bottom: 20px; 
}

.modal-footer {
  text-align: right;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

button[color="primary"] {
  background-color: #007bff;
  color: white;
}

button[color="error"] {
  background-color: #dc3545;
  color: white;
  margin-left: 10px; 
}

button:hover {
  opacity: 0.9; 
}

select {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 5px; 
  width: 100%; 
}
</style>

  