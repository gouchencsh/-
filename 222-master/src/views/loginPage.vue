<script setup>
import { ref, reactive } from 'vue'
import request from '../api/request'
import { useUserStore } from '../store/userStore'
const userStore = useUserStore()
import { useRouter } from 'vue-router'
const router = useRouter()
// 响应式数据,保存用户输入的登录信息
let loginUser = reactive({
    userAccount: '',
    password: ''
})
async function submitLogin(event) {
    event.preventDefault()
    console.log("正在请求登录")
    // 登录逻辑
    let flag1 = checkUsername()
    let flag2 = checkUserPwd()
    if (!(flag1 && flag2)) {
        return
    }
    let response = await request.post("admin/login", loginUser)
    console.log(response)
    if (response.code === 1) {
        userStore.setUser(response.data)
        router.push("/")
    } else {
        alert("账号或密码错误")
    }
}
let isUsernameMsg = ref(false)//登录账号提示
function checkUsername() {
    if (loginUser.userAccount === "" ) {
        isUsernameMsg.value = true
        return false
    } else {
        isUsernameMsg.value = false
        return true
    }
}
let isUserPwdMsg = ref(false)//登录密码提示
function checkUserPwd() {
    if (loginUser.password === "") {
        isUserPwdMsg.value = true
        return false
    } else {
        isUserPwdMsg.value = false
        return true
    }
}
</script>

<template>
    <div class="container">
        <div class="login-card">
            <div class="card-header">
                <div class="log">系统登录</div>
            </div>
            <form>
                <div class="form-group">
                    <label>用户名:<span v-show="isUsernameMsg" class="loginAndRegistPrompts">账号不存在或格式错误(12位)</span></label>
                    <input required type="text" v-model="loginUser.userAccount" @blur="checkUsername()">
                </div>
                <div class="form-group">
                    <label>密码:<span v-show="isUserPwdMsg" class="loginAndRegistPrompts">密码错误</span></label>
                    <input required type="password" v-model="loginUser.password" @blur="checkUserPwd()">
                </div>
                <div class="form-group">
                    <input value="Login" type="submit" @click="submitLogin">
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.loginAndRegistPrompts {
    color: red;
    font-size: 10px;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('https://s2.loli.net/2024/09/24/6TLYUOJpicz3VlK.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.login-card {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid rgba(204, 204, 204, 0.5);
    /* 边框透明 */
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    /* 透明背景 */
    box-shadow: 2px 2px 10px rgba(204, 204, 204, 0.5);
    /* 阴影透明 */
}

.card-header {
    text-align: center;
    margin-bottom: 20px;
}

.card-header .log {
    margin: 0;
    font-size: 24px;
    color: black;
}

.form-group {
    margin-bottom: 15px;
}

label {
    font-size: 18px;
    margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 12px 20px;
    font-size: 16px;
    border: 1px solid rgba(204, 204, 204, 0.5);
    /* 输入框边框透明 */
    border-radius: 4px;
    box-sizing: border-box;
    transition: 0.5s;
    background-color: rgba(255, 255, 255, 0.7);
    /* 输入框背景透明 */
}

input[type="submit"] {
    width: 100%;
    background-color: rgba(51, 51, 51, 0.7);
    /* 按钮背景透明 */
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

input[type="submit"]:hover {
    background-color: rgba(204, 204, 204, 0.7);
    /* 鼠标悬停时按钮变浅 */
    color: black;
}
</style>
