<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';

const store = useStore();
const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const error = ref('');

const register = () => {
  axios
    .post('http://localhost:5000/api/users/register', {
      name: name.value,
      email: email.value,
      password: password.value,
    })
    .then(() => {
      console.log('registered!');
      store
        .dispatch('user/login', {
          email: email.value,
          password: password.value,
        })
        .then(() => {
          router.push('/');
        })
        .catch((err) => {
          error.value = err.message;
        });
    })
    .catch((err) => {
      error.value = err.response.data.message;
    });
}
</script>

<template>
  <div class="w-screen h-screen bg-gray-50 flex items-center justify-center">
    <div class="bg-white p-16 w-full mx-16 md:mx-0 md:w-1/2 xl:w-1/3">
      <h1 class="text-center border-gray-300 border-b p-4 mb-8 font-bold">新規登録</h1>
      <form @submit.prevent="register">
        <div class="flex flex-col space-y-8">
          <input
            v-model="name"
            type="text"
            name="name"
            placeholder="名前"
            class="border p-4 rounded-sm text-sm"
          />
          <input
            v-model="email"
            type="text"
            name="email"
            placeholder="メールアドレス"
            class="border p-4 rounded-sm text-sm"
          />
          <input
            v-model="password"
            type="password"
            name="password"
            placeholder="パスワード"
            class="border p-4 rounded-sm text-sm"
          />
        </div>
        <p v-show="error" class="mt-4 text-red-500">{{ error }}</p>
        <button class="w-full mt-8 py-4 bg-blue-600 text-white text-sm rounded-sm">
          新規登録
        </button>
      </form>
    </div>
  </div>
</template>