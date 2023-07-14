import { createWebHistory, createRouter } from 'vue-router'

const history = createWebHistory()

const homePage = () => import('../views/homePage.vue')
const fileUpdatePage = () => import('../views/fileUpdatePage/index.vue')
const fileDiff = () => import('../views/fileDiff.vue')
const checkFile = () => import('../views/checkFile/index.vue')
const localFilePage = () => import('../views/localFilePage/index.vue')



const router = createRouter({
    history, // 路由模式
    routes: [
        {
            path: '/',
            redirect: "/homePage"
        },
        {
            path: '/homePage',
            name: 'homePage',
            component: homePage,
            children: [
                {
                    path: '',
                    name: 'default',
                    component: fileUpdatePage
                },
                {
                    path: '/fileUpdatePage/index',
                    name: 'fileUpdatePage',
                    component: fileUpdatePage
                },
                {
                    path: '/localFilePage/index',
                    name: 'localFilePage',
                    component: localFilePage
                },
            ]
        },
        {
            path: '/fileDiff',
            name: 'fileDiff',
            component: fileDiff
        },
        {
            path: '/checkFile',
            name: 'checkFile',
            component: checkFile
        }
    ]
})

export default router