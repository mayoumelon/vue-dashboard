<script setup>
import { reactive } from 'vue';
import { TemplateIcon, ShoppingCartIcon } from '@heroicons/vue/outline';

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
    sublists: [
      {
      name: '商品一覧',
      link: '/#',
      },
      {
      name: '注文一覧',
      link: '/#',
      },
    ],
  },
]);

const icons = {
  TemplateIcon: TemplateIcon,
  ShoppingCartIcon: ShoppingCartIcon,
};
</script>
<template>
  <ul class="text-gray-700">
    <li class="mb-1" v-for="list in lists" :key="list.name">
      <a :href="list.link" class="flex items-center block p-2 rounded-sm hover:text-white hover:bg-blue-400">
        <component :is="icons[list.icon]" class="w-6 h-6 mr-2"></component>
        <span>{{ list.name }}</span>
      </a>
    </li>
  </ul>
</template>