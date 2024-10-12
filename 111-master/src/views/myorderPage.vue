<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="全部订单" name="first">
      <el-table :data="AllOrders" style="width: 100%">
        <el-table-column label="订单时间" width="100">
          <template #default="scope">
            {{ formatDate(scope.row.updateTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="orderNumber" label="订单号" width="150" />
        <el-table-column prop="commodityName" label="商品名称" width="150" />
        <el-table-column prop="coverImg" label="商品图片" width="180">
          <template #default="score">
            <el-image :src="score.row.coverImg" style="width: 80px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="waybillNumber" label="货运单号" width="180" />
        <el-table-column prop="receiverName" label="收货人" width="110" />
        <el-table-column prop="receiverPhone" label="收货人电话" width="180" />
        <el-table-column prop="receiverAddress" label="地址">
          <template #default="scope">
            {{ formatAddress(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column prop="orderStates" label="状态" width="180">
          <template #default="scope">
            {{ order(scope.row.orderStates) }}
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>


    <el-tab-pane label="待付款" name="9">
      <el-table :data="PendingPayment" style="width: 100%">
        <el-table-column label="订单时间" width="100">
          <template #default="scope">
            {{ formatDate(scope.row.updateTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="orderNumber" label="订单号" width="150" />
        <el-table-column prop="commodityName" label="商品名称" width="150" />
        <el-table-column label="商品图片" width="180">
          <template #default="score">
            <el-image :src="score.row.coverImg" style="width: 80px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="commodityNumber" label="数量" width="110" />
        <el-table-column prop="totalPrice" label="总价" width="110" />
        <el-table-column prop="receiverName" label="收货人" width="110" />
        <el-table-column prop="receiverPhone" label="收货人电话" width="110" />
        <el-table-column prop="paymentType" label="付款方式" width="110">
          <template #default="scope">
            {{ type(scope.row.paymentType) }}
          </template>
        </el-table-column>
        <el-table-column prop="receiverAddress" label="地址">
          <template #default="scope">
            {{ formatAddress(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" width="110">
          <template #default="scope">
            <button type="button" class="el-button el-button--danger" style="width: 80px; margin-left: 0px"
              @click="updateOrder(scope.row, 1)">
              <span>去支付</span>
            </button>
            <button type="button" class="el-button el-button--info is-plain" style="width: 80px;margin-left: 0px"
              @click="updateOrder(scope.row, 10)">
              <span>取消</span>
            </button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>


    <el-tab-pane label="待发货" name="1">
      <el-table :data="PendingShipment" style="width: 100%">
        <el-table-column label="订单时间" width="100">
          <template #default="scope">
            {{ formatDate(scope.row.updateTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="orderNumber" label="订单号" width="150" />
        <el-table-column prop="commodityName" label="商品名称" width="150" />
        <el-table-column label="商品图片" width="180">
          <template #default="score">
            <el-image :src="score.row.coverImg" style="width: 80px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="commodityNumber" label="数量" width="110" />
        <el-table-column prop="totalPrice" label="总价" width="110" />
        <el-table-column prop="receiverName" label="收货人" width="110" />
        <el-table-column prop="receiverPhone" label="收货人电话" width="110" />
        <el-table-column prop="paymentType" label="付款方式" width="110">
          <template #default="scope">
            {{ type(scope.row.paymentType) }}
          </template>
        </el-table-column>
        <el-table-column prop="receiverAddress" label="地址">
          <template #default="scope">
            {{ formatAddress(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" width="110" />
      </el-table>
    </el-tab-pane>


    <el-tab-pane label="待收货" name="2">
      <el-table :data="ToBeReceived" style="width: 100%">
        <el-table-column prop="time" label="订单时间" width="100" />
        <el-table-column prop="number" label="订单号" width="110" />
        <el-table-column prop="name" label="商品名称" width="110" />
        <el-table-column prop="image" label="商品图片" width="180">
          <template #default="score">
            <el-image :src="score.row.image" style="width: 80px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="数量" width="110" />
        <el-table-column prop="totalPricer" label="总价" width="110" />
        <el-table-column prop="receiver" label="收货人" width="110" />
        <el-table-column prop="phone" label="收货人电话" width="110" />
        <el-table-column prop="paymentStatus" label="付款方式" width="110" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="operate" label="操作" width="110" />
      </el-table>
    </el-tab-pane>


    <el-tab-pane label="已收货" name="3">
      <el-table :data="Received" style="width: 100%">
        <el-table-column prop="time" label="订单时间" width="100" />
        <el-table-column prop="number" label="订单号" width="110" />
        <el-table-column prop="name" label="商品名称" width="110" />
        <el-table-column prop="image" label="商品图片" width="180">
          <template #default="score">
            <el-image :src="score.row.image" style="width: 80px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="数量" width="110" />
        <el-table-column prop="totalPricer" label="总价" width="110" />
        <el-table-column prop="receiver" label="收货人" width="110" />
        <el-table-column prop="phone" label="收货人电话" width="110" />
        <el-table-column prop="paymentStatus" label="付款方式" width="110" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="operate" label="操作" width="110" />
      </el-table>
    </el-tab-pane>


    <el-tab-pane label="退货中" name="4">
      <el-table :data="Returns" style="width: 100%">
        <el-table-column prop="time" label="订单时间" width="100" />
        <el-table-column prop="number" label="订单号" width="110" />
        <el-table-column prop="name" label="商品名称" width="110" />
        <el-table-column prop="image" label="商品图片" width="180">
          <template #default="score">
            <el-image :src="score.row.image" style="width: 80px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="数量" width="110" />
        <el-table-column prop="totalPricer" label="总价" width="110" />
        <el-table-column prop="receiver" label="收货人" width="110" />
        <el-table-column prop="phone" label="收货人电话" width="110" />
        <el-table-column prop="paymentStatus" label="付款方式" width="110" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="operate" label="操作" width="110" />
      </el-table>
    </el-tab-pane>


    <el-tab-pane label="已退货" name="5">
      <el-table :data="Returned" style="width: 100%">
        <el-table-column prop="time" label="订单时间" width="100" />
        <el-table-column prop="number" label="订单号" width="110" />
        <el-table-column prop="name" label="商品名称" width="110" />
        <el-table-column prop="image" label="商品图片" width="180">
          <template #default="score">
            <el-image :src="score.row.image" style="width: 80px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="数量" width="110" />
        <el-table-column prop="totalPricer" label="总价" width="110" />
        <el-table-column prop="receiver" label="收货人" width="110" />
        <el-table-column prop="phone" label="收货人电话" width="110" />
        <el-table-column prop="paymentStatus" label="付款方式" width="110" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="operate" label="操作" width="110" />
      </el-table>
    </el-tab-pane>


    <el-tab-pane label="已取消" name="10">
      <el-table :data="canceled" style="width: 100%">
        <el-table-column label="订单时间" width="100">
          <template #default="scope">
            {{ formatDate(scope.row.updateTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="orderNumber" label="订单号" width="150" />
        <el-table-column prop="commodityName" label="商品名称" width="150" />
        <el-table-column label="商品图片" width="180">
          <template #default="score">
            <el-image :src="score.row.coverImg" style="width: 80px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="commodityNumber" label="数量" width="110" />
        <el-table-column prop="totalPrice" label="总价" width="110" />
        <el-table-column prop="receiverName" label="收货人" width="110" />
        <el-table-column prop="receiverPhone" label="收货人电话" width="110" />
        <el-table-column prop="paymentType" label="付款方式" width="110">
          <template #default="scope">
            {{ type(scope.row.paymentType) }}
          </template>
        </el-table-column>
        <el-table-column prop="receiverAddress" label="地址">
          <template #default="scope">
            {{ formatAddress(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" width="110" />
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
const activeName = ref('first'); // 默认选中 "全部订单"
import request from '../api/request'
const AllOrders = ref([])
const orderDTO = ref([])
onMounted(async () => {
  // 获取订单信息
  await getAllOrders()
})
async function getAllOrders() {//获取所有订单
  let { data } = await request.post("/order/getOrderList", orderDTO)
  console.log(data)
  AllOrders.value = data
}
async function addOrder(orderDTO) {//添加订单
  let { data } = await request.post("/order/addOrder", orderDTO)
  console.log(data)
}
async function updateOrder(orderDTO, orderState) {//修改订单
  // 修改 orderDTO 的 orderStates 属性
  orderDTO.orderStates = orderState;
  let { data } = await request.post("/order/updateOrder", orderDTO);
  // 输出返回结果
  console.log(data);
}

const PendingPayment = computed(() => {
  return AllOrders.value.filter(order => order.orderStates == 9);
})
const PendingShipment = computed(() => {
  return AllOrders.value.filter(order => order.orderStates == 1);
})
const ToBeReceived = computed(() => {
  return AllOrders.value.filter(order => order.orderStates == 2);
})
const Received = computed(() => {
  return AllOrders.value.filter(order => order.orderStates == 3);
})
const Returns = computed(() => {
  return AllOrders.value.filter(order => order.orderStates == 4);
})
const Returned = computed(() => {
  return AllOrders.value.filter(order => order.orderStates == 5);
})
const canceled = computed(() => {
  return AllOrders.value.filter(order => order.orderStates == 10);
})
function formatDate(dateArray) {
  if (!dateArray || dateArray.length < 6) return '';
  const [year, month, day, hour, minute, second] = dateArray;
  return `${year}/${month}/${day},${hour}:${minute}:${second}`;
}
function formatAddress(order) {
  const { receiverProvince, receiverDistrict, receiverCity, receiverAddress } = order;
  return `${receiverProvince || ''}/${receiverDistrict || ''}/${receiverCity || ''}/${receiverAddress || ''}`;
}
//订单页面
function order(orderStates) {
  switch (orderStates) {
    case 9: return "待付款";
    case 1: return "待发货";
    case 2: return "待收货";
    case 3: return "已收货";
    case 4: return "退货中";
    case 5: return "已退货";
    case 10: return "已取消";
    default: return "未知状态";
  }
}
//订单页面结算
function type(paymentType) {
  switch (paymentType) {
    case 1: return "微信支付";
    case 2: return "支付宝";
    case 3: return "银联付款";
    case 4: return "未支付";
    default: return "未知方式";
  }
}

</script>
<style>
.demo-tabs {
  padding: 0 7%
}
</style>