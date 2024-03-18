<template>
    <div class="p-6 overflow-y-auto flex flex-col items-center space-y-6">
    
      <div class="text-base md:text-lg font-bold w-full flex justify-between text-gray-800 bg-gradient-to-r from-gray-50 to-gray-200 py-5 px-4  header">
        <span class="header-item">{{ $t('date') }}</span>
        <span class="header-item">{{ $t('fajr') }}</span>
        <span class="header-item">{{ $t('dhuhr') }}</span>
        <span class="header-item">{{ $t('asr') }}</span>
        <span class="header-item">{{ $t('maghrib') }}</span>
        <span class="header-item">{{ $t('isha') }}</span>
      </div>
  
      <div class="flex flex-col w-full h-full bg-white rounded-lg">
        <RecycleScroller :items="times" :item-size="50" class="flex-grow" key-field="date">
          <template v-slot="{ item }" >
            <div class="flex justify-between p-3 bg-gray-100 item">
              <span class="item-detail">{{ item.date }}</span>
              <span class="item-detail">{{ item.fajr }}</span>
              <span class="item-detail">{{ item.dhuhr }}</span>
              <span class="item-detail">{{ item.asr }}</span>
              <span class="item-detail">{{ item.maghrib }}</span>
              <span class="item-detail">{{ item.isha }}</span>
            </div>
          </template>
        </RecycleScroller>
        <div v-if="!allItemsLoaded" class="sentinel" ref="sentinel"></div>
      </div>
    </div>
  </template>
  
  
<script>
import { RecycleScroller } from 'vue3-virtual-scroller';
import LoadingState from '../Spinner/LoadingState.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'Table',
  components: {
    RecycleScroller,
  },
  props: {
    times: Array,
    allItemsLoaded: Boolean,
    loadMore: Function,
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
}

.header-item, .item-detail {
  flex: 1;
  text-align: center;
}

.header-item:first-child, .item-detail:first-child {
  text-align: left;
}

.header-item:last-child, .item-detail:last-child {
  text-align: right;
}

</style>