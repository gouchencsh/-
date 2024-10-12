import { createWebHistory, createRouter } from "vue-router";
import homePage from "@/views/homePage.vue";
import cartPage from "@/views/cartPage.vue";
import confirmorderPage from "@/views/confirmorderPage.vue";
import myorderPage from "@/views/myorderPage.vue";
import personalPage from "@/views/personalPage.vue";
import detaPage from "@/views/detaPage.vue";
import Header from '@/views/Header.vue'
import Footer from '@/views/Footer.vue'
import Othergoods from "@/views/Othergoods.vue";
import forgetpwdPage from "@/views/forgetpwdPage.vue";
import searchResult from "@/views/searchResult.vue";


// import 

//创建路由配置
const routes = [
    {   //重定义
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: homePage
    },
    {
        path: '/deta',
        name: 'deta',
        component: detaPage
    },
    {
        path: '/cart',
        name: 'cart',
        component: cartPage
    },
    {
        path: '/confirmorder',
        name: 'confirmorder',
        component: confirmorderPage
    },
    {
        path: '/myorder',
        name: 'myorder',
        component: myorderPage
    },
    {
        path: '/personal',
        name: 'personal',
        component: personalPage
    },
    {
        path: '/forgetpwd',
        name: 'forgetpwd',
        component: forgetpwdPage
    },
    {
        path: "/footer",
        component: Footer
    },
    {
        path: "/header",
        component: Header
    },
    {
        path: "/othergoods",
        component: Othergoods
    },
    {
        path: "/othergoods/:categoryId/:subcategory",
        component: Othergoods
    },
    {
        path: "/searchResult",
        component: searchResult
    }
]

//创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
})
// 添加全局路由守卫
router.beforeEach((to, from, next) => {
    // 需要进行token校验的路由
    const authRequiredRoutes = ['/cart', '/confirmorder', '/myorder', '/personal']
    const token = localStorage.getItem('token')
    // 判断是否访问需要校验的页面并且没有token
    if (authRequiredRoutes.includes(to.path) && !token) {
        alert('无权限，请先登录')
        next('/');
    } else {
        // 有token，或不需要校验的页面，放行
        next();
    }
})

//导出实例
export default router