import { createRouter, createWebHistory } from 'vue-router';
import { store } from '../store';
import Dashboard from '../pages/Dashboard.vue';
import Profile from '../pages/Profile.vue';
import Order from '../pages/Order.vue';
import Product from '../pages/Product.vue';
import SignUp from '../pages/SignUp.vue';
import Login from '../pages/Login.vue';
import axios from 'axios';

const routes = [
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: { requiresAuth: true },
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.state.user.user) {
      console.log(store.state.user.user);
      next('login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;