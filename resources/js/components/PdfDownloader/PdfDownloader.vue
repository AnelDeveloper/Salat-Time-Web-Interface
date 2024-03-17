<template>
    <button @click="downloadPdf" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
      Download PDF
    </button>
  </template>
  
  <script setup>
  import { jsPDF } from 'jspdf';
  import { defineProps } from 'vue';
  
  const props = defineProps({
    data: {
      type: Array,
      default: () => [],
    },
    fileName: {
      type: String,
      default: 'data.pdf',
    },
  });
  
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
  
    doc.text(props.fileName, 105, 20, null, null, 'center');
    const headers = ["Date", "Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    let yPos = 40;
  
    doc.setFontSize(12);
    headers.forEach((header, index) => {
      doc.text(header, 10 + (index * 40), 30); 
    });
  
    doc.line(10, 32, 200, 32);
  
    props.data.forEach((time, index) => {
      const timeValues = [time.date, time.fajr, time.dhuhr, time.asr, time.maghrib, time.isha];
      let xPos = 10;
  
      timeValues.forEach((value, idx) => {
        doc.text(value, xPos, yPos);
        xPos += 40; 
      });
  
      yPos += 10; 
  
      if (yPos > 280) {
        doc.addPage();
        yPos = 10;
      }
    });
  
    doc.save(props.fileName);
  };
  </script>
  