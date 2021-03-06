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
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/publishQuestion',
        name: 'PublishQuestion',
        component: () => import('../views/PublishQuestion.vue')
    },
    {
        path: '/modifyQuestion/:id',
        name: 'ModifyQuestion',
        component: () => import('../views/ModifyQuestion.vue')
    },
    {
        path: '/question/:id',
        name: 'Question',
        component: () => import('../views/Question.vue')
    },
    {
        path: '/publishAnswer/:id',
        name: 'PublishAnswer',
        component: () => import('../views/PublishAnswer.vue')
    },
    {
        path: '/modifyAnswer/:id',
        name: 'ModifyAnswer',
        component: () => import('../views/ModifyAnswer.vue')
    },
    {
        path: '/update_profile',
        name: 'UpdateProfile',
        component: () => import('../views/UpdateProfile.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue')
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
