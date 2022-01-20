import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import Profile from '../pages/Profile.vue';
import Order from '../pages/Order.vue';
import Product from '../pages/Product.vue';
import SignUp from '../pages/SignUp.vue';

const routes = [
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;