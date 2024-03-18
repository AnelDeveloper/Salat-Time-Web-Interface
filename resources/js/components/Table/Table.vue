<template>
  <div class="p-4 flex flex-col items-center space-y-4">

    <div class="flex flex-col w-full bg-white rounded-lg shadow">
        <div v-for="item in times" :key="item.date" class="flex justify-between p-2 bg-gray-100 item">
            <span class="item-detail">{{ item.date }}</span>
            <span class="item-detail">{{ item.sunrise }}</span>
            <span class="item-detail">{{ item.fajr }}</span>
            <span class="item-detail">{{ item.dhuhr }}</span>
            <span class="item-detail">{{ item.asr }}</span>
            <span class="item-detail">{{ item.maghrib }}</span>
            <span class="item-detail">{{ item.isha }}</span>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'Table',
  components: {
  },
  props: {
    times: Array,
    allItemsLoaded: Boolean,
  },
  setup(props) {
    const sentinel = ref(null); 

    const createIntersectionObserver = () => {
      const options = {
        root: null,
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !props.allItemsLoaded) {
            props.loadMore();
          }
        });
      }, options);

      if (sentinel.value) {
        observer.observe(sentinel.value);
      }

      onBeforeUnmount(() => {
        if (observer) {
          observer.disconnect();
        }
      });
    };

    onMounted(() => {
      createIntersectionObserver();
    });

    return {
      sentinel,
    };
  },
};
</script>

<style scoped>
.header, .item {
  display: flex;
  justify-content: space-between;
  padding: 4px 8px; 
}

.header-item, .item-detail {
  flex: 1;
  text-align: center;
  font-size: 0.75rem; 
}


.item {
  
  min-height: 30px; 
}

.header-item:first-child, .item-detail:first-child {
  text-align: left;
}


.flex.flex-col.w-full.bg-white.rounded-lg.shadow {
  width: 100%; 
}




</style>