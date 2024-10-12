<script setup>

</script>

<template>

  <div class="footerbg">
    <div class="footer">
      <div class="massage_box">
        <ul class="massage">
          <li><span class="massage_title">服务保证</span></li>
          <li><span>→正品保证</span></li>
          <li><span>→7天无理由放心退</span></li>
          <li><span>→24小时客服</span></li>
          <li><span>→7天无理由放心换</span></li>
        </ul>
      </div>
      <div class="massage_box">
        <ul class="massage">
          <li><span class="massage_title">购物指南</span></li>
          <li><span>→导购演示</span></li>
          <li><span>→订单操作</span></li>
          <li><span>→会员注册</span></li>
          <li><span>→账户管理</span></li>
          <li><span>→收货样品</span></li>
        </ul>
      </div>
      <div class="massage_box">
        <ul class="massage">
          <li><span class="massage_title">售后服务</span></li>
          <li><span>→退货政策</span></li>
          <li><span>→退货流程</span></li>
          <li><span>→会员注册</span></li>
          <li><span>→退款方式和时效</span></li>
        </ul>
      </div>
      <div class="massage_box">
        <ul class="massage">
          <li><span class="massage_title">关于更多</span></li>
          <li><img id="contact_picture" src="../assets/ewm.png" alt=""></li>
        </ul>
      </div>
    </div>
    <div class="end_remarkes">
      <span>
        Copyright © 2008-2024 vip.com,All Rights
        Reserved 使用本网站即表示接受用户协议。版权所有：######
      </span>
    </div>
  </div>


</template>

<style scoped>
span {
  margin-top: 5%;
  margin-bottom: 5%;
}

.footer .massage .massage_title {
  font-size: 24px;
}

.footerbg {
  background-color: black;
  color: white;
  line-height: 5;


}

.footer {
  width: 1200px;
  display: flex;
  margin-left: 10%;
  margin-right: 10%;
}

.massage_box {
  border-right: 2px solid white;
  padding-right: 10px;
  align-items: center;
  flex: 1;
  /* 使每个 box 占据相等的空间 */

}
.massage_box:last-child {
  border-right: none;
}


.massage {

  list-style-type: none;
  line-height: 1.8;
  text-align: center;
}

.end_remarkes {
  text-align: center;
}

#contact_picture {
  width: 100px;
  height: 100px;
  margin-top: 1px;
}
.massage span:hover {
  color: #409EFF;
}
.massage .massage_title:hover {
  color: inherit;
}
</style>
