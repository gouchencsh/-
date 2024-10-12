<template>
  <div style="background-color: #aaaaaa; width: 1475px; height: 50px">
    <div style="font-size: large; text-align: left; margin-left: 150px">搜索结果</div>
    <div style="font-size: large; text-align: left; margin-left: 135px">Search Result</div>
  </div>
  <el-card class="image-on-bottom"  align="middle" justify="center" >
    <div style="background-color: #393939; width: 1300px; height: 45px">
      <el-row :gutter="30" >
        <el-col :span="2">
          <div class="box">综合</div>
        </el-col>
        <el-col :span="2">
          <div class="box">销量</div>
        </el-col>
        <el-col :span="2">
          <div class="box">价格</div>
        </el-col>
        <el-col :span="2">
          <div class="box">折扣</div>
        </el-col>
      </el-row>
    </div>
    <div style="background-color: white; width: 1310px;" >
      <el-row :gutter="15" style="text-align: center">
        <el-col :span="4" v-for="(product) in shoppingData" :key="product" >
          <el-card  shadow="always" class="cardStyle">
            <div style="padding: 15px; text-align: center">
              <el-image :src="product.coverImg"  style="width: 140px; height: 130px;"></el-image>
<!--              <p class="pass">{{ page.name }}</p>-->
              <p class="pass">{{ product.commodityName }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import { commodityToName } from "@/api/index.js";
const route = useRoute();
const receivedKeyword = route.query.keyword;
const shoppingData = ref([])

// 页面加载完成后立即触发此onMounted钩子函数
onMounted(async () => {
  if (receivedKeyword){
    try {
      const res = await commodityToName({commodityName: receivedKeyword});
      if (res && res.data){
        shoppingData.value = res.data;
      }else {
        console.log("未获取到商品")
      }
    }catch (error){
      console.log('商品获取时发生错误', error);
    }
  }else {
    console.log('没有搜索词');
  }
})



</script>

<style scoped>
.image-on-bottom {
  position: relative;
  background-image:url("@/assets/bg.jpg");
  background-size: 100% 100%;
}
.image-on-bottom img {
  position: absolute;
  bottom: 0;
}
.box{
  color:rgb(255, 255, 255);
  margin-top: 12px;
}
.pass{
  margin-top: 5px;
  margin-bottom: 5px
}
</style>