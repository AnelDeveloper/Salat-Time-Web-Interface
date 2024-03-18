<template>
  <button @click="downloadPdf" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
    Download PDF
  </button>
</template>

<script setup>
import { jsPDF } from 'jspdf';
import { defineProps } from 'vue';
import 'jspdf-autotable'; 

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

  const headers = [["Date", "Sunrise", "Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]];

  const data = props.data.map(d => [
    d.date, d.sunrise, d.fajr, d.dhuhr, d.asr, d.maghrib, d.isha
  ]);

  doc.autoTable({
    head: headers,
    body: data,
    startY: 30,
    theme: 'striped',
    styles: { font: 'helvetica', fontSize: 10 },
    headStyles: { fillColor: [22, 160, 133] },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 'auto' },
      3: { cellWidth: 'auto' },
      4: { cellWidth: 'auto' },
      5: { cellWidth: 'auto' },
      6: { cellWidth: 'auto' },
    },
    didDrawPage: function (data) {
    
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.text('Page ' + pageCount, data.settings.margin.left, doc.internal.pageSize.height - 10);
    },
  });

  doc.save(props.fileName);
};
</script>
