import { createWebHistory, createRouter } from "vue-router";
import goodstypesPage from "@/views/goodstypesPage.vue";
import usermanagerPage from "@/views/usermanagerPage.vue";
import goodsPage from "@/views/goodsPage.vue";
import orderPage from "@/views/orderPage.vue";
import sidePage from "@/views/sidePage.vue";
import topPage from "@/views/topPage.vue";
import loginPage from "../views/loginPage.vue";
//创建路由配置
const routes = [
    {
        //重定向
        path:'/',
        redirect:'/usermanager'
    },
    {
        path: '/login',
        name: 'login',
        component: loginPage
    },
    {
        path: '/usermanager',
        name: 'usermanager',
        component: usermanagerPage
    },
    {
        path: '/goodstypes',
        name: 'goodstypes',
        component: goodstypesPage
    },
    {
        path: '/goods',
        name: 'goodsPage',
        component: goodsPage
    },
    {
        path: '/order',
        name: 'order',
        component: orderPage
    },
    {
        path: '/side',
        name: 'side',
        component: sidePage
    },
    {
        path: '/top',
        name: 'top',
        component: topPage
    },
]


//创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
})
// 添加全局前置守卫
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token'); // 假设 token 存储在 localStorage 中
    if (to.name !== 'login' && !token) {
        // 如果要跳转的不是登录页面且没有 token，重定向到登录页面
        next('/login');
    } else {
        // 允许导航
        next();
    }
});


//导出实例
export default router
