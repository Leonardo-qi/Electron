import { createWebHistory, createRouter } from 'vue-router'

const history = createWebHistory()

const fileUpdatePage = () => import('../views/fileUpdatePage/index.vue')
const fileDiff = () => import('../views/fileDiff.vue')
const ads = () => import('../views/ads.vue')



const router = createRouter({
    history, // 路由模式
    routes: [
        {
            path: '/',
            redirect: "/fileUpdatePage/index"
        },
        {
            path: '/fileUpdatePage/index',
            name: 'fileUpdatePage',
            component: fileUpdatePage
        },
        {
            path: '/ads',
            name: 'ads',
            component: ads
        },
        {
            path: '/fileDiff',
            name: 'fileDiff',
            component: fileDiff
        }
    ]
})

export default router