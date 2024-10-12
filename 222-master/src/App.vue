<script setup>
import topPage from './views/topPage.vue'
import loginPage from './views/loginPage.vue';
import sidePage from './views/sidePage.vue'
</script>

<template>
  <div>
    <div v-if="$route.name == 'login'">
      <loginPage></loginPage>
    </div>
    <div v-else class="layout">
      <sidePage class="side"></sidePage>
      <topPage class="top"></topPage>
      <router-view class="content"></router-view>
    </div>

  </div>
</template>

<style scoped>
.layout {
  position: relative;
}

.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
}

.side {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 30;
}

.content {
  position: relative;
  z-index: 10;
  margin-top: 55px;
  margin-left: 253px;
  overflow-y: auto;
  height: calc(100vh - 55px);
  /* 计算高度，以便在 topPage 下滑动 */
}
</style>
