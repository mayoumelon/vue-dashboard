import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './index.css'
import { store } from './store';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const token = localStorage.getItem('accessToken');

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const user = jwt_decode(token);
  store.dispatch('user/setUser', user);
}

createApp(App).use(router).use(store).mount('#app')
