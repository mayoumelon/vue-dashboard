<script setup>
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { TemplateIcon, ShoppingCartIcon, ChevronDownIcon } from '@heroicons/vue/outline';

const lists = reactive([
  {
    name: 'ダッシュボード',
    icon: 'TemplateIcon',
    link: '/'
  },
  {
    name: 'EC',
    icon: 'ShoppingCartIcon',
    link: '/#',
    show: false,
    sublists: [
      {
      name: '商品一覧',
      link: '/product',
      },
      {
      name: '注文一覧',
      link: '/order',
      },
    ],
  },
]);

const currentRoute = computed(() => {
  return useRoute().fullPath;
});

const icons = {
  TemplateIcon: TemplateIcon,
  ShoppingCartIcon: ShoppingCartIcon,
};

const toggle = (name) => {
  const list = lists.find((list) => list.name === name);
  list.show = !list.show;
};

const enter = (element) => {
  element.style.height = "auto";
  const height = getComputedStyle(element).height;
  element.style.height = 0;
  getComputedStyle(element);
  setTimeout(() => {
      element.style.height = height;
  });
};

const leave = (element) => {
  element.style.height = getComputedStyle(element).height;
  getComputedStyle(element);
  setTimeout(() => {
      element.style.height = 0;
  });
};
</script>

<template>
  <ul class="text-gray-700 dark:text-gray-300">
    <li class="mb-1" v-for="list in lists" :key="list.name">
      <router-link
        v-if="!list.sublists"
        :to="list.link"
        class="flex items-center p-2 rounded-sm hover:text-white hover:bg-blue-400"
        :class="{
          'bg-blue-600 text-white' : currentRoute === list.link,
        }"  
      >
        <component :is="icons[list.icon]" class="w-6 h-6 mr-2"></component>
        <span>{{ list.name }}</span>
      </router-link>
      <div
        v-else
        class="
          flex
          items-center
          justify-between
          p-2
          cursor-pointer
          rounded-sm
          hover:bg-blue-400 hover:text-white
        "
        @click="toggle(list.name)"
        >
        <div class="flex items-center">
          <component :is="icons[list.icon]" class="w-6 h-6 mr-2"></component>
          <span>{{ list.name }}</span>
        </div>
        <ChevronDownIcon
          class="w-4 h-4"
          :class="!list.show ? 'rotate-0' : '-rotate-180'"
        />
      </div>
      <transition @enter="enter" @leave="leave">
        <ul class="mt-1 overflow-hidden" v-show="list.show">
          <li class="mb-1" v-for="list in list.sublists">
            <router-link
              :to="list.link"
              class="block p-2 rounded-sm hover:bg-blue-400 hover:text-white"
              :class="{
                'bg-blue-600 text-white' : currentRoute === list.link,
              }" 
            >
              <span class="pl-8">{{ list.name }}</span>
            </router-link>
          </li>
        </ul>
      </transition>
    </li>
  </ul>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: height 0.3s;
}
</style>