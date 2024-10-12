<template>
  <div>
      <el-carousel height="360px" type="card" style="margin-right: 30px">
      <el-carousel-item v-for="imagePage in images" :key="imagePage">
        <div class="carousel-card">
          <img :src="imagePage" alt="Image">
        </div>
        <h3 class="medium">{{ images }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="tit">
    <p style="font-size: 40px; margin: auto 0;">每日必逛</p>
    <p style="font-size: 16px; margin-top: 4px;">THE SECTON YOU NEED</p>
  </div>
  <div>
    <el-row :gutter="20" type="flex" align="middle" justify="center">
      <el-col :span="8" >
        <div style="text-align: center;">
          <h3>热销排行</h3>
          <el-image :src="tite" style="width: 400px; height: 300px;"></el-image>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="text-align: center;">
          <h3>新品上市</h3>
          <el-image :src="tite2" style="width: 400px; height: 300px;"></el-image>
        </div>
      </el-col>
    </el-row>
  </div>
  <h1 style="text-align: center;">商品展示</h1>
  <div style="margin-top: 20px">
    <el-row :gutter="0" >
      <el-col :span="6" v-for="(item, index) in shoppingData" :key="index" >
        <el-card  shadow="always" class="cardStyle"  align="middle" justify="center">
        <div @click="handleImageClick(item.id)" style="padding: 0;">
          <el-image :src="item.coverImg"  style="width: 200px; height: 200px; align-items: center;"></el-image>
<!--          <p class="paa-spacing">{{ item.name }}</p>-->
          <p class="paa-spacing">{{ item.commodityName }}</p>
          <h2 class="paa-spacing" style="color: red">￥{{item.price}}</h2>
        </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import image4 from '@/assets/lb01.png'
import image5 from '@/assets/lb02.png'
import image6 from '@/assets/lb03.png'
import image7 from '@/assets/lb04.png'
import image17 from '@/assets/hot.png'
import image18 from '@/assets/new.png'
// import { defineComponent } from 'vue';
import { onMounted, ref } from "vue";
import { getShoppingData } from "@/api/index"; // 引入接口
import { useRouter } from "vue-router";
const shoppingData = ref([])

const tite = image17
const tite2 = image18
const router = useRouter()
const images = ref([image4, image5, image6, image7])


// 页面加载完成后立即触发此onMounted钩子函数
onMounted(() => {
  getCard()
})

function getCard() {
  // 调用获取商品数据的接口getDataList, 接口要求传递空对象
  getShoppingData({}).then((res) => {
    console.log('请求成功返回的数据', res);

    // 从接口返回的数据res中将属于商品列表的数据提取出来, 赋值给tableData变量
    shoppingData.value = res.data;

  }).catch((err) => {
    console.log('请求失败返回的数据', err);
  });
}
// const src = image
// const pages = ref([
//   { id: 1, name: '页面 1', url: image, description: '时尚的T恤，时尚百搭', price: '999元' },
//   { id: 2, name: '页面 2', url: image2, description: '时尚的T恤，时尚百搭', price: '999元' },
//   { id: 3, name: '页面 3', url: image3, description: '时尚的T恤，时尚百搭', price: '999元' },
//   { id: 4, name: '页面 4', url: image8, description: '时尚的T恤，时尚百搭', price: '999元' },
//   { id: 5, name: '页面 5', url: image9, description: '时尚的T恤，时尚百搭', price: '999元' },
//   { id: 6, name: '页面 6', url: image10, description: '时尚的T恤，时尚百搭', price: '999元' },
//   { id: 7, name: '页面 7', url: image11, description: '时尚的T恤，时尚百搭', price: '999元' },
//   { id: 8, name: '页面 8', url: image12, description: '时尚的T恤，时尚百搭', price: '999元' },
//   { id: 9, name: '页面 9', url: image13, description: '时尚的T恤，时尚百搭', price: '999元' },
//   { id: 10, name: '页面 10', url: image14, description: '时尚的T恤，时尚百搭', price: '999元' },
//   { id: 11, name: '页面 11', url: image15, description: '时尚的T恤，时尚百搭', price: '999元' },
//   { id: 12, name: '页面 12', url: image16, description: '时尚的T恤，时尚百搭', price: '999元' },
//
//       ],)

function handleImageClick(item) {
      // window.location.href = url;
  router.push({
    path: '/deta',
    query:{
      id: item
    }
  })
    }

</script>

<style scoped>
.tit{
  color: rgb(128, 128, 128);
  text-align: center;
  margin-top: 30px;
}

.carousel-card {
  margin-top: 3px;
  margin-left: 35px;
  //margin-right: 2000px;
  width: 100%;
  height: 100%;
  //border-radius: 10px;
  //box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.carousel-card img {
  width: 100%;
  height: inherit;
  //object-fit: cover;
}

.cardStyle{
  width: 300px;
  height: 320px;
  margin-left: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.paa-spacing{
  //margin-top: 2px;
  //margin-bottom: 2px;
  margin: 0;
}
</style>
