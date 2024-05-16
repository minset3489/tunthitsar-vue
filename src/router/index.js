import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Details from '../views/Details.vue'
import Products from '../views/Products.vue'
import Review from '../views/Review.vue'
import Order from '../views/Order.vue'

import Signup from '../views/auth/Signup.vue'
import Login from '../views/auth/Login.vue'

import AboutData from '../views/dataImports/AboutData.vue'
import CreateProducts from '../views/dataImports/CreateProducts.vue'
import OrderData from '../views/dataImports/OrderData.vue'
import HomeData from '../views/dataImports/HomeData.vue'




// firebase imports
import { auth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  if (!user) {
    next({ name: 'Login' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/details/:id',
    name: 'details',
    component: Details,
    props : true
  }, 
  {
    path: '/',
    name: 'home',
    component: Home
  },
  
  {
    path: '/products/:id',
    name: 'products',
    component: Products,
    props :true
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/review',
    name: 'review',
    component: Review
  },
  {
    path: '/order',
    name: 'order',
    component: Order
  },
  {
    path: '/auth/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: requireAuth
  },
  ,
  {
    path: '/auth/login',
    name: 'Login',
    component: Login,
  },

  
  {
    path: '/dataImports/create',
    name: 'CreateProducts',
    component: CreateProducts,
    beforeEnter: requireAuth
  },  
  {
    path: '/dataImports/orderdata',
    name: 'OrderData',
    component: OrderData,
    beforeEnter: requireAuth
  },
  {
    path: '/dataImports/about',
    name: 'AboutData',
    component: AboutData,
    beforeEnter: requireAuth
  },
  {
    path: '/dataImports/homedata',
    name: 'HomeData',
    component: HomeData,
    beforeEnter: requireAuth
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
