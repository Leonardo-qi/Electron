import { createWebHistory, createRouter } from 'vue-router'

const history = createWebHistory()

const Home = () => import('../views/home.vue')
const fileDiff = () => import('../views/fileDiff.vue')


const router = createRouter({
    history, // 路由模式
    routes: [
        {
            path: '/',
            redirect: "/home"
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/fileDiff',
            name: 'fileDiff',
            component: fileDiff
        }
    ]
})

export default router