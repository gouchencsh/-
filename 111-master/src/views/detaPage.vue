<template>
  <el-card class="image-on-bottom"  align="middle" justify="center"  >
    <div>
      <h2 class="h-tit">商品详情</h2>
    </div>
  <div style="background-color: white; width: 1150px;" >
    <el-row :gutter="100" type="flex" align="middle" justify="center">
      <el-col style="text-align: left">
        <div class="el-div">
          <div class="color">商品>>女装>>T-shirt</div>
        </div>
      </el-col>
      <el-col :span="10">
        <div style="text-align: center; border: 1px solid black;">
          <el-image :src="tite"></el-image>
          <h3>商品信息</h3>
        </div>
      </el-col>
      <el-col :span="10"  style="border: 1px solid black;padding: 10px;">
        <div >
          <p style="font-weight: 1000;">{{commodityName}}</p>
          <div class="back">
            <div style="display: flex;">
              <div class="size">￥{{price}}</div>
              <div class="font">今日特价</div>
            </div>
            <div class="coll">6天后结束</div>
          </div>
          <p class="p-spacing">配送：除新疆、西藏等部分偏远地区3天内送达</p>
          <p class="p-spacing">运费： 订单满80元包运费 </p>
          <p class="p-spacing">尺码： 39 40 41 42 43 </p>
          <div style="text-align: left; ">
            颜色：<el-button>黑色</el-button>
            <el-button>白色</el-button>
            <el-button>黑白</el-button>
          </div>
          <div class="custom-input-number">
           选择数量：<el-input-number v-model="num" :min="1" :max="10"/>
          </div>
          <div class="align">库存：{{stock }}</div>
        </div>
      </el-col>
    </el-row>
    <div><el-button @click="shoppGet" class="el-bu">加入购物车</el-button></div>
    <div><el-divider dashed>这是一个虚线分隔线</el-divider></div>
    <div>
      <div class="sty"> 100%正品 | 天天有优惠 </div>
      <div class="top"> ★7天无理由退换 ★10天保价 ★极速退款</div>
      <div style="margin-left: 400px">★15天质量无忧 ★上门退货 ★正规发票</div>
    </div>
    <div><el-divider dashed>
      <div class="vider">商品参数</div>
    </el-divider></div>
    <div class="der">
      <div style="color: rgb(255, 255, 255);">{{intro}}</div>
    </div>
    <div><el-divider dashed>
      <div class="el-der">商品展示</div>
    </el-divider></div>
    <div class="last">
      <div class="el-last">您可能会喜欢</div>
    </div>
    <el-row>
    <el-col :span="4.7" v-for="page in pages" :key="page.id" >
      <el-card  shadow="always" class="cardStyle">
        <div style="padding: 15px; text-align: center">
          <el-image :src="page.url"  style="width: 140px; height: 130px;"></el-image>
          <p class="pass">{{ page.name }}</p>
          <p class="pass">{{ page.description }}</p>
          <p class="pass">价格：{{page.price}}</p>
        </div>
      </el-card>
    </el-col>
    </el-row>
  </div>
  </el-card>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import image2 from '@/assets/5.jpg'
import image3 from '@/assets/4.jpg'
import image4 from '@/assets/3.jpg'
import image5 from '@/assets/2.jpg'
import image6 from '@/assets/1.jpg'
import { addDataList, getCommodityById } from "@/api/index.js";
import { useRoute } from 'vue-router'
import { ElMessage } from "element-plus";
const route = useRoute()

const num = ref(1)
const tite = ref()
const price = ref()
const stock = ref()
const intro = ref()
const commodityName = ref()
const userId = localStorage.getItem('id');

const pages = ref([
  { id: 1, name: '页面 2', url: image2, description: '时尚的T恤，时尚百搭', price: '999元' },
  { id: 2, name: '页面 2', url: image3, description: '时尚的T恤，时尚百搭', price: '999元' },
  { id: 3, name: '页面 2', url: image4, description: '时尚的T恤，时尚百搭', price: '999元' },
  { id: 4, name: '页面 2', url: image5, description: '时尚的T恤，时尚百搭', price: '999元' },
  { id: 5, name: '页面 2', url: image6, description: '时尚的T恤，时尚百搭', price: '999元' },
])

// 页面加载完成后立即触发此onMounted钩子函数
onMounted(() => {
  getById();
  window.scrollTo(0, 0);
})
function shoppGet() {
  if ('stock' <= 0) {
    ElMessage.error("商品库存不足");
    return
  }
  // 调用获取商品数据的接口getDataList, 接口要求传递空对象
  const data = {
    commodityId: route.query.id,
    userId: userId,
    commodityNumber: num.value
  }
  addDataList(data).then((res) => {
    console.log('请求成功返回的数据', res);
    ElMessage.success("添加商品成功");
    // 从接口返回的数据res中将属于商品列表的数据提取出来, 赋值给tableData变量
    // addDataList.value = res.data;

  }).catch((err) => {
    console.log('请求失败返回的数据', err);
  });
}

function getById(){
  getCommodityById({
    id: route.query.id
  }).then((res) => {
    console.log('请求成功返回的数据', res);

    // 从接口返回的数据res中将属于商品列表的数据提取出来, 赋值给tableData变量
    tite.value = res.data.coverImg
    price.value = res.data.price
    stock.value = res.data.stock
    intro.value = res.data.intro
    commodityName.value = res.data.commodityName

  }).catch((err) => {
    console.log('请求失败返回的数据', err);
  });
}
</script>
<style scoped>
.pass{
  margin-top: 5px;
  margin-bottom: 5px
}
.cardStyle{
  width: 200px;
  height: 280px;
  padding: 5px;
  margin-left: 14px;
  margin-top: 10px
}
.color{
  color: rgb(255, 255, 255);
  font-weight: 700;
}
.back{
  height: 65px;
  width: 100%;
  background: rgb(43, 42, 42);
}
.size{
  font-size: 30px;
  margin-left: 30px;
  margin-top: 10px;
  color: rgb(255, 255, 255);
}
.font{
  font-weight: 800;
  font-size: 30px;
  margin-left: 240px;
  color: rgb(255, 255, 255);
}
.coll{
  margin-left: 320px;
  color: rgb(255, 255, 255);
}
.align{
  text-align: left;
  margin-left: 20px;
  color: rgb(204, 204, 204);
}
.sty{
  margin-top: 40px;
  margin-left: -600px
}
.top{
  margin-top: -30px;
  margin-left: 400px;
}
.vider{
  font-size: large;
  font-weight: 600;
  color: rgb(81, 124, 141);
}
.der{
  height: 65px;
  width: 1010px;
  background: rgb(43, 42, 42);
}
.image-on-bottom {
  position: relative;
  background-image:url("@/assets/bg.jpg");
  background-size: 100% 100%;
}
.image-on-bottom img {
  position: absolute;
  bottom: 0;
}
.p-spacing{
  margin-top: 35px;
  margin-bottom: 35px;
  text-align: left;
}
.custom-input-number{
  text-align: center;
  margin-top: 35px;
  //margin-bottom: 35px;
}
.h-tit{
  color: white;
  margin-left: -1050px
}
.el-div{
  margin-left: 105px;
  margin-top: 80px;
  width: 200px;
  height: 30px;
  background: rgb(43, 42, 42);
}
.el-bu{
  background: rgb(43, 42, 42);
  width: 200px;
  height: 50px;
  color: white;
  margin-top: 30px;
  margin-left: 820px
}
.el-last{
  text-align: left;
  margin-top: 20px;
  margin-left: 20px;
  font-size: larger;
  color: rgb(255, 255, 255);
}
.last{
  width: 1030px;
  height: 30px;
  background-color: rgb(43, 42, 42);
}
.el-der{
  font-size: large;
  font-weight: 600;
  color: rgb(81, 124, 141);
}
</style>