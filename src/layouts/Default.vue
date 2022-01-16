<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import {MenuIcon} from '@heroicons/vue/outline';
import { debounce } from 'lodash';

const innerWidth = ref(window.innerWidth);
const show = ref(innerWidth.value >= 1280 ? true : false);
const checkWindowSize = () => {
    innerWidth.value = window.innerWidth;
    if (innerWidth.value >= 1280) {
        console.log(' >= 1280');
        if (show.value === false ) show.value = true;
    } else {
        console.log(' < 1280');
        if (show.value === true) show.value = false;
    }
    
};

onMounted(() => {
    window.addEventListener('resize', debounce(checkWindowSize, 100));
});
onUnmounted(() => {
    window.removeEventListener('resize', checkWindowSize);
});
</script>

<template>
  <div class="relative">
      <div class="fixed top-0 w-64 h-screen bg-white z-20 transition duration-300" :class="{ '-translate-x-full': !show }">
        サイドバー
      </div>
      <div class="fixed xl:hidden inset-0 bg-gray-900 opacity-50 z-10" @click="show = !show" v-show="show"></div>
      <div class="bg-gray-100 h-screen overflow-hidden transition duration-300" :class="{ 'xl:pl-64': show }">
          <div class="bg-white rounded shadow m-4 p-4">
              <MenuIcon class="h-6 w-6 text-gray-600 cursor-pointer" @click="show = !show" />
          </div>
          <div>
              <slot />
          </div>
      </div>
  </div>
</template>

<style>
</style>
