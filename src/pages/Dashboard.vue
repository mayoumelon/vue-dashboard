<script setup>
import Default from '../layouts/Default.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const user = computed(() => store.state.user.user);
</script>
<template>
  <Default>{{ user.name }}さんのダッシュボード</Default>
</template>