<template>
  <div>
    <Header></Header>

    <router-view></router-view>

    <Footer></Footer>

  </div>

</template>

<script setup>
import Header from './views/Header.vue';
import Footer from './views/Footer.vue';
</script>

<style scoped>
</style>
