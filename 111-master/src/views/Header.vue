<script setup>
import { ref, computed, onMounted } from 'vue'
import { User } from '@element-plus/icons-vue'
import { ShoppingCartFull } from '@element-plus/icons-vue'
import LoginAndRegist from './LoginAndRegist.vue'
const showLogin = ref(false)
import { useUserStore } from '../store/userStore'
const userStore = useUserStore()
const isLoggedIn = ref(localStorage.getItem('token') !== null && localStorage.getItem('token') !== '')
import { useRouter } from 'vue-router'
import request from '../api/request'
const AllType = ref([]) //所有商品分类原数据
onMounted(() => {
  // 获取商品分类数据
  getType()
})
async function getType() {
  let { data } = await request.get("/reception/commodityType_user")
  console.log(data)
  AllType.value = data
}
const router = useRouter()
let searchKeyword = ''
const search = () => {
  router.push({
    path: '/searchResult',
    query: { keyword: searchKeyword }
  })
}
function Logout() {
  // 清除 Pinia 数据和 localStorage 数据
  userStore.clearUser()
  isLoggedIn.value = false; // 手动更新状态
  router.push('/home')
}
// 控制分类菜单显示 悬浮展示 离开消失
const isClassifyMenuVisible = ref(false)
</script>
<template>
  <div class="headerbg">
    <div class="header">
      <div class="header_left">
        <a href="/home" class="upreightlink1">
          <img id="logo01" src="../assets/logo.png" alt="">
        </a>
        <a href="/home">
          <div class="upreightlink" id="zhenxuan">甄选</div>
        </a>
        <!-- 分类按钮 -->
        <div class="upreightlink" @mouseenter="isClassifyMenuVisible = true"
          @mouseleave="isClassifyMenuVisible = false">
          <div id="classifymovedown1">分类</div>
          <!-- 分类菜单 -->
          <div v-show="isClassifyMenuVisible" class="dropdown-menu">
            <div v-for="category in AllType" :key="category.id" class="dropdown-category">
              <router-link :to="`/othergoods?id=${category.id}&cid`" class="no-link-styles">
                <span class="category_name">
                  {{ category.typeName }}
                </span>
              </router-link>
              <div v-for="subcategory in category.children" :key="id" class="dropdown-subcategory">
                <router-link :to="`/othergoods?id=${category.id}&cid=${subcategory.id}`" class="no-link-styles">
                  <span class="subcategory_name">
                    {{ subcategory.typeName }}
                  </span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="upreightlink" id="classifymovedown2">关于我们</div>
      </div>
      <div class="header_right">
        <div class="el-input">
          <div class="el-input__wrapper">
            <input class="el-input__inner" type="text" placeholder="输入商品名称" v-model="searchKeyword">
          </div>
        </div>
        <button class="el-button" @click="search">搜索</button>
        <div class="upreightlink">
          <div v-if="!isLoggedIn">
            <el-tooltip content="请先登录" placement="bottom">
              <el-icon class="car-icon">
                <ShoppingCartFull />
              </el-icon>
            </el-tooltip>
          </div>
          <div v-else>
            <router-link to="/cart">
              <el-tooltip content="购物车" placement="bottom">
                <el-icon class="car-icon">
                  <ShoppingCartFull />
                </el-icon>
              </el-tooltip>
            </router-link>
          </div>
        </div>
        <div class="upreightlink">
          <!-- 未登录显示 -->
          <div v-if="!isLoggedIn">
            <el-tooltip content="点击登录" placement="bottom">
              <el-icon class="user-icon" @click="showLogin = true">
                <User />
              </el-icon>
            </el-tooltip>
          </div>
          <!-- 登录时显示 -->
          <div v-else>
            <el-dropdown>
              <el-icon class="user-icon">
                <User />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <router-link to="/personal" class="no-link-styles">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                  </router-link>
                  <el-dropdown-item @click="Logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹窗部分 -->
    <LoginAndRegist v-if="showLogin" @close="showLogin = false" />
  </div>
</template>
<style scoped>
#logo01 {
  height: 50px;
  width: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -5px;
}

#classifymovedown1,
#classifymovedown2 {
  margin-top: 8px;
}

.header_left,
.header_right {
  display: flex;
  align-items: center;
}

.upreightlink {
  margin-left: 10px;
}

#zhenxuan {
  font-size: 28px;
  margin: 0;

}

.header_left {
  margin-left: 150px;
}

.header_right {
  margin-right: 150px;
}

.el-input {
  margin-right: 10px;
}

.headerbg {
  background-color: black;
  padding: 10px 0;
  height: 40px;
  left: 0;
  right: 0;
  width: 100%;

}

.no-link-styles {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}


.upreightlink {
  color: white;
  position: relative;
}

.car-icon,
.user-icon {
  color: white;
  font-size: 30px;
}

/* 分类菜单样式 */
.dropdown-menu {
  z-index: 99;
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  background-color: black;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  /* 水平等分排列 */
  align-items: flex-start;
  width: 100vw;
  /* 设置宽度为浏览器的宽度 */
  box-sizing: border-box;
  /* 确保 padding 不影响宽度 */
}

.dropdown-category {
  display: flex;
  flex-direction: column;
  /* 垂直排列子元素 */
  align-items: center;
  /* 居中子元素 */
  margin: 0 20px;
  /* 设置一定的左右间距 */
}

.dropdown-category span {
  font-weight: bold;

}

.dropdown-subcategory span {
  display: block;
  margin-top: 5px;
  cursor: pointer;
  text-align: center;
}

.dropdown-category span:hover {
  color: #409EFF;
}

.category_name {
  font-size: 20px;
}

.subcategory_name {
  font-size: small;
  color: rgba(245, 245, 245, 0.673);
}
</style>
