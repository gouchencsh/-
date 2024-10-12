import axios from 'axios'

// 创建 Axios 实例
const requests = axios.create({
    baseURL: '/api',
    timeout: 10000
});

// 请求拦截器
requests.interceptors.request.use(
    config => {
        // 部分接口需要拥有token才能访问，token代表的权限信息，用于判断用户是否登录
        if (localStorage.getItem('token')) {
            config.headers['token'] = localStorage.getItem('token')
        }
        return config;
    }
);

// // 响应拦截器
requests.interceptors.response.use(
    response => {
        return response.data;
    }
)



export default requests;
