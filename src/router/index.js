import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginPage from '../views/LoginPage'
import MainPage from '../views/MainPage'
import airCondition from '../components/airCondition'
import airCompare from '../components/airCompare'
// import axios from 'axios';

Vue.use(VueRouter);
// Vue.use(axios);

export const router = new VueRouter({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: LoginPage,
      name: 'LoginPage'
    },
    {
      path: '/main',
      component: MainPage,
      name: 'MainPage',
      children: [{
          path: 'airCondition',
          component: airCondition
        },
        {
          path: 'airCompare',
          component: airCompare
        }
      ]
    }
  ]
})
