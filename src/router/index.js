import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */'../views/Register.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "register" */'../views/Account.vue'),
    children: [
      {
        path: "my-courses",
        name: "MyCourses",
        component: ()=> import('../components/MyCourses.vue'),
        children:[
          {
            path: "courses-enrrolled",
            name: "CoursesEnrrolled",
            component: ()=> import('../components/CoursesEnrrolled.vue')
          },
          {
            path: "courses-created",
            name: "CoursesCreated",
            component: ()=> import('../components/CoursesCreated.vue'),
          }
        ]
      },
      {
        path: "my-info",
        name: "MyInfo",
        component: ()=> import('../components/MyInfo.vue'),        
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component:() => import(/* webpackChunkName: "login" */ '../views/Search.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component:() => import(/* webpackChunkName: "login" */'../views/About.vue'),
  },
  {
    path: '/help',
    name: 'Help',
    component:() => import(/* webpackChunkName: "login" */'../views/Help.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
