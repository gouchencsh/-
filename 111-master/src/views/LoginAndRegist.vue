<script setup>
import { ref, reactive } from 'vue'
import request from '../api/request'
import { useUserStore } from '../store/userStore'
const userStore = useUserStore()
import { useRouter } from 'vue-router'
const router = useRouter()
// 用来控制显示登录或注册表单
const isLogin = ref(true)
const emit = defineEmits()
// 响应式数据,保存用户输入的登录信息
let loginUser = reactive({
    userAccount: '',
    password: ''
})
// 响应式数据,保存用户输入的注册信息
let registUser = reactive({
    username: '',
    userPwd: ''
})
// 响应式数据,保存校验的确认密码信息
let reUserPwd = ref('')
async function submitLogin() {
    // 登录逻辑
    let flag1 = checkUsername()
    let flag2 = checkUserPwd()
    if (!(flag1 && flag2)) {
        return
    }
    let response = await request.post("user/login", loginUser)
    console.log(response)

    if (response.code === 1) {
        userStore.setUser(response.data)
        emit('close')
        location.reload()
    } else {
        alert("账号或密码错误")
    }

}
function submitRegist() {
    //注册逻辑
    if (registUser.userPwd === reUserPwd.value) {
        alert('注册成功')
        isLogin.value = true // 注册成功后切换回登录状态
    } else {
        alert('密码不匹配')
    }
}
function switchToRegist() {
    isLogin.value = false // 切换到注册表单
}
function switchToLogin() {
    isLogin.value = true // 切换到登录表单
}
let isUsernameMsg = ref(false)//登录账号提示
function checkUsername() {
    if (loginUser.userAccount === "") {
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
let isRegUsernameMsg = ref(false)//注册账号提示
function checkRegUsername() {
    if (registUser.username === "") {
        isRegUsernameMsg.value = true
    } else {
        isRegUsernameMsg.value = false
    }
}
let isRegUserPwdMsg = ref(false)//注册密码提示
function checkRegUserPwd() {
    if (registUser.userPwd === "") {
        isRegUserPwdMsg.value = true
    } else {
        isRegUserPwdMsg.value = false
    }
}
let isRegUserRePwdMsg = ref(false)//注册确认密码提示
function checkRegUserRePwd() {
    if (reUserPwd === "" || reUserPwd !== registUser.userPwd) {
        isRegUserRePwdMsg.value = true
    } else {
        isRegUserRePwdMsg.value = false
    }
}
</script>

<template>
    <div class="modal" style="z-index: 999">
        <div class="login-box">
            <span class="close" @click="emit('close')">&times;</span>
            <p v-if="isLogin" class="textloginAndregist">登录</p>
            <p v-else class="textloginAndregist">注册</p>
            <form v-if="isLogin" @submit.prevent="submitLogin">
                <div class="user-box">
                    <input required name="username" type="text" v-model="loginUser.userAccount"
                        @keyup.enter="submitLogin" @blur="checkUsername()">
                    <label>账号<span v-show="isUsernameMsg" class="loginAndRegistPrompts">账号不能为空</span></label>
                </div>

                <div class="user-box">
                    <input required name="password" type="password" v-model="loginUser.password"
                        @keyup.enter="submitLogin" @blur="checkUserPwd()">
                    <label>密码<span v-show="isUserPwdMsg" class="loginAndRegistPrompts">密码不能为空</span></label>
                </div>
                <a href="#" @click.prevent="submitLogin">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    确认
                </a>
            </form>

            <form v-else @submit.prevent="submitRegist">
                <div class="user-box">
                    <input required="" name="" type="text" v-model="registUser.username" @keyup.enter="submitRegist"
                        @blur="checkRegUsername()">
                    <label>账号<span v-show="isRegUsernameMsg" class="loginAndRegistPrompts">账号不能为空</span></label>
                </div>
                <div class="user-box">
                    <input required="" name="" type="password" v-model="registUser.userPwd" @keyup.enter="submitRegist"
                        @blur="checkRegUserPwd()">
                    <label>密码<span v-show="isRegUserPwdMsg" class="loginAndRegistPrompts">密码不能为空</span></label>
                </div>
                <div class="user-box">
                    <input required="" name="" type="password" v-model="reUserPwd" @keyup.enter="submitRegist"
                        @blur="checkRegUserRePwd()">
                    <label>确认密码<span v-show="isRegUserRePwdMsg" class="loginAndRegistPrompts">确认密码有误</span></label>
                </div>
                <a href="#" @click.prevent="submitRegist()">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    确认
                </a>
            </form>
            <p v-if="isLogin">没有账号？去 <a href="#" class="a2" @click.prevent="switchToRegist">注册</a></p>
            <p v-else>已有账号？去 <a href="#" class="a2" @click.prevent="switchToLogin">登录</a></p>
        </div>
    </div>
</template>

<style scoped>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
    font-size: 28px;
    cursor: pointer;
}

/* From Uiverse.io by glisovic01 */
.textloginAndregist {
    color: #02160b;
    font-size: 28px;
    text-align: center;
}

.loginAndRegistPrompts {
    color: red;
    font-size: 10px;
}

.login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    padding: 40px;
    margin: 20px auto;
    transform: translate(-50%, -55%);
    background: rgba(128, 140, 140, 0.9);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
    border-radius: 10px;
}

.login-box p:first-child {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 1px;
}

.login-box .user-box {
    position: relative;
}

.login-box .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
}

.login-box .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: .5s;
}

.login-box .user-box input:focus~label,
.login-box .user-box input:valid~label {
    top: -20px;
    left: 0;
    color: #fff;
    font-size: 12px;
}

.login-box form a {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    font-weight: bold;
    color: #fff;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 3px
}

.login-box a:hover {
    background: #fff;
    color: #272727;
    border-radius: 5px;
}

.login-box a span {
    position: absolute;
    display: block;
}

.login-box a span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #fff);
    animation: btn-anim1 1.5s linear infinite;
}

@keyframes btn-anim1 {
    0% {
        left: -100%;
    }

    50%,
    100% {
        left: 100%;
    }
}

.login-box a span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #fff);
    animation: btn-anim2 1.5s linear infinite;
    animation-delay: .375s
}

@keyframes btn-anim2 {
    0% {
        top: -100%;
    }

    50%,
    100% {
        top: 100%;
    }
}

.login-box a span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #fff);
    animation: btn-anim3 1.5s linear infinite;
    animation-delay: .75s
}

@keyframes btn-anim3 {
    0% {
        right: -100%;
    }

    50%,
    100% {
        right: 100%;
    }
}

.login-box a span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #fff);
    animation: btn-anim4 1.5s linear infinite;
    animation-delay: 1.125s
}

@keyframes btn-anim4 {
    0% {
        bottom: -100%;
    }

    50%,
    100% {
        bottom: 100%;
    }
}

.login-box p:last-child {
    color: #aaa;
    font-size: 14px;
}

.login-box a.a2 {
    color: #fff;
    text-decoration: none;
}

.login-box a.a2:hover {
    background: transparent;
    color: #aaa;
    border-radius: 5px;
}
</style>
