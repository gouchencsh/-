<template>
  <div style="height:1050px;">
    <div class="box1">
      <el-container>
        <el-header style="width: 1200px;margin: 0%;height: 60px;">
          <p><b>订单结算</b></p>
          <p><small>Order Settlement</small></p>
        </el-header>
      </el-container>
    </div>
    <div class="box2">
      <el-container>
        <el-header style="width: 850px;margin: 0%;height: 270px;">
          <p>选择收货地址:</p>
          <div style="width: 1200px;max-height: 170px;">
            <el-scrollbar max-height="170px">
              <el-radio-group v-model="selectedItem" size="large">
                <el-radio v-for="item in items" :value="item" :key="item.id" style="width: 100%;">
                  {{ item.receiverName }} {{ item.receiverPhone }} {{ item.receiverProvince }} {{ item.receiverCity }}
                  {{ item.receiverDistrict }} {{ item.receiverAddress }}
                </el-radio>
                <!-- <el-radio :value="9" style="width: 100%;">李云家 12345678910 北京市 市辖区 东城区 1522</el-radio>
                <el-radio :value="12" style="width: 100%;">李云家 12345678910 北京市 市辖区 东城区 1522</el-radio>
                <el-radio :value="15" style="width: 100%;">李云家 12345678910 北京市 市辖区 东城区 1522</el-radio>
                <el-radio :value="18" style="width: 100%;">李云家 12345678910 北京市 市辖区 东城区 1522</el-radio> -->
              </el-radio-group>
            </el-scrollbar>
          </div>
        </el-header>
      </el-container>
    </div>
    <div class="xx" style="width: 1200px;height: 100px;">
      <div style="width: 950px;height: 40px;background-color:white;float:left">
      </div>
      <div class="box3" style="width: 200px;height: 40px;float: left;">
        <el-button type="primary" @click="dialogFormVisible = true">
          新增收货地址
        </el-button>

        <!-- <el-button type="primary" @click="add = true">
          新增收货地址
        </el-button> -->

      </div>
      <div style="width: 550px;height: 40px;"></div>
      <div data-v-2c101ab0="" style="display: flex; margin-top: 5px;width: 1200px;;">
        <div style="width: 550px;height: 4px;"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(227, 71, 71, 0.996);"></div>
        <div style="width:25px;height:4px;margin-left:5px;background:rgba(67, 106, 203, 0.996);"></div>
      </div>
      <div style="width: 1200px;height: 30px;" b>
        <p style="text-indent: 19%;font-size: 130%;">确认商品信息:</p>
      </div>
    </div>
    <div class="box4" style="background-color: white;">
      <el-container>
        <el-header class="Product" style="width: 1200px;margin: 0%;max-height: 750px;">
          <!-- <div style="width: 300px; float: left;background-color:aqua;height: 700px;">
          </div> -->
          <div class="table1" style="width: 950px;color: black;">
            <el-table :data="tableData" stripe style="width: 80%;max-height: 600px;">
              <el-table-column prop="coverImg" label="" width="100">
                <template #default="scope">
                  <el-image :src="scope.row.coverImg"></el-image>
                </template>
              </el-table-column>
              <el-table-column prop="commodityName" label="商品名称" width="170" />
              <el-table-column prop="specification" label="商品规格" width="130" />
              <el-table-column prop="price" label="商品单价" width="130" />
              <el-table-column prop="commodityNumber" label="数量" width="130" />
              <el-table-column prop="subtotal" label="小计" />
            </el-table>


            <div class="checkbox-container"
              style="width: 800px;height: 20px;background-color:white;margin-left: 390px;">
              <input type="checkbox" id="myCheckbox1">
              <label for="myCheckbox" class="checkbox-label">朋友代付</label>
              <input type="checkbox" id="myCheckbox2">
              <label for="myCheckbox" class="checkbox-label">匿名购买</label>
              <input type="checkbox" id="myCheckbox3">
              <label for="myCheckbox" class="checkbox-label">号码保护（保护收货人隐私）</label>
            </div>
            <div style="width: 800px;height: 30px;text-indent: 70%;">
              注：推荐与卖家提前咨询商品信息
            </div>
            <div style="width: 800px;height: 40px;background-color: antiquewhite; text-indent: 80%;">
              <b style="font-size: 140%;">总计：{{ totalPrice }}</b>
            </div>
            <div style="width: 800px;height:40px">
              <el-button type="primary" @click="dialogVisible = true" style="margin-left:713px;margin-top:10px">
                前往支付
              </el-button>
            </div>
          </div>
        </el-header>
      </el-container>
    </div>

  </div>
  <el-dialog v-model="dialogFormVisible" title="新增收货地址" width="500">
    <el-form :model="form">
      <el-form-item label="收货人" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" type="text" placeholder="请输入收货人名称" />
      </el-form-item>
      <el-form-item label="收货地址" :label-width="formLabelWidth">
        <el-cascader v-model="value" :options="options" @change="handleChange" />
      </el-form-item>
      <el-form-item label="详细地址" :label-width="formLabelWidth">
        <el-input v-model="form.address" autocomplete="off" type="text" placeholder="请输入详细地址" />
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth">
        <el-input v-model="form.Phone" autocomplete="off" type="text" placeholder="请输入手机号" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addressFun " >
          新增地址
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogVisible" title="" width="500" :before-close="handleClose">
    <span>
      <el-radio-group v-model="radio">
        <el-radio :value="1">微信支付</el-radio>
        <el-radio :value="2">支付宝支付</el-radio>
        <el-radio :value="3">银联支付</el-radio>
      </el-radio-group>
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="danger" @click="[addOrder(orderDTO), updateOrder(orderDTO, 9)]">
          <router-link to="/myorder" style="text-decoration: none;color: white;">取消支付</router-link>
        </el-button>
        <el-button type="primary" @click="[addOrder(orderDTO), updateOrder(orderDTO, 1)]">
          <router-link to="/myorder" style="text-decoration: none;color: white;">确认支付</router-link>
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script setup>
import { useRoute } from 'vue-router'
import { reactive, ref, onMounted,computed } from 'vue'
import request from '../api/request'
import { getCartMessage } from '@/api/index';
import logo1 from "@/assets/1.jpg";
import { ElMessage, ElMessageBox } from 'element-plus'
import { getDataList } from '@/api/index';
import { address } from '@/api/index';
import { agetaddress } from '@/api/index';
const dialogFormVisible = ref(false)
const orderDTO = ref([])

const route = useRoute()

const value = ref([])

const handleChange = (value) => {
  console.log(value)
}

const dialogVisible = ref(false)

const handleClose = (done) => {
  ElMessageBox.confirm('您还要修改订单信息吗?')
    .then(() => {
      done()
    })
    .catch(() => {

    })
}


async function addOrder() {//添加订单
  let { data } = await request.post("/order/addOrder", orderDTO)
  console.log(data)
}
async function updateOrder(orderDTO, orderState) {
  // 修改 orderDTO 的 orderStates 属性
  orderDTO.orderStates = orderState;
  // 发送请求
  let { data } = await request.post("/order/updateOrder", orderDTO);
  // 输出返回结果
  console.log(data);
}

const options = [
  {
    value: '北京市',
    label: '北京市',
    children: [
      {
        value: '走下去',
        label: '走下去',
        children: [
          {
            value: '东城区',
            label: '东城区',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
]

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})



const logo1img = logo1

//111111111111111111111111111111111111111111111111111111

const userId = localStorage.getItem('id')
onMounted(() => {
  getTable()
})



function getTable() {
  const data = {
    id: route.query.arrayParam
  }
  // 调用获取表格数据的接口getDataList
  getCartMessage(data).then((res) => {
    console.log('123', res);

    // 从接口返回的数据res中将属于table列表的数据提取出来, 赋值给tableData变量
    tableData.value = res.data;
    console.log('3256313333', tableData.value[0].price);
  }).catch((err) => {
    console.log('请求失败返回的数据', err);
  });
}
// agetaddress({}).then((res) => {
//         console.log('请求成功返回的数据', res);

agetaddress({ userId: localStorage.getItem('id') }).then((res) => {
  console.log('请求成功返回的数据', res);

  // 从接口返回的数据res中将属于商品列表的数据提取出来, 赋值给tableData变量
  items.value = res.data;

}).catch((err) => {
  console.log('请求失败返回的数据', err);
});
//11111111111111111111111111111111111111111111111111111



const tableData = ref([
])

const selectedItem = ref([]);
const subtotal = tableData.value.price * tableData.value.commodityNumber;

const totalPrice = computed(() => {
  return tableData.value.reduce((sum, item) => sum + item.price * item.commodityNumber, 0)
});

const items = ref([])

function addressFun() {
  const data = {
    id: null,
    isDefault: 0,
    receiverAddress: form.address,
    receiverCity: value.value[1],
    receiverDistrict: value.value[2],
    receiverName: form.name,
    receiverPhone: form.Phone,
    receiverProvince: value.value[0],
    userId: localStorage.getItem('id'),
  }

  address(data).then((res) => {
    console.log('成功添加地址', res);
    ElMessage.success('添加成功');

    agetaddress({ userId: localStorage.getItem('id') }).then((res) => {
      console.log('请求成功返回的数据', res);

      // 从接口返回的数据res中将属于商品列表的数据提取出来, 赋值给tableData变量
      items.value = res.data;

    }).catch((err) => {
      console.log('请求失败返回的数据', err);
    });
  }).catch((err) => {
    console.log('失败添加地址', err);
    ElMessage.error('添加失败');
  });

}

function confirmPayment() {
  if (!selectedPaymentMethod.value) {
    ElMessage({
      type: 'warning',
      message: '请选择支付方式',
    });
    return;
  }
  const orders = cartItems.value.map(item => ({
    userId: sessionStorage.getItem('id'),
    addressId: selectedAddress.value,
    paymentType: Number(selectedPaymentMethod.value),
    commodityId: item.commodityId,
    commodityNumber: item.commodityNumber,
    totalPrice: item.commodityNumber * item.price,
    orderStates: 1,
    paymentTime: new Date().toISOString(),
  }));

  addOrder(orders).then(res => {
    console.log('所有订单支付成功', res);
    ElMessage({
      type: 'success',
      message: '支付成功',
    });
    deletec();
    paymentDialogVisible.value = false;
    router.push('/myorder');
  }).catch(err => {
    console.error('支付过程中发生错误', err);
    ElMessage({
      type: 'error',
      message: '支付过程中发生错误',
    });
  });
}
//取消支付
function cancelPayment() {
  const orders = cartItems.value.map(item => ({
    userId: sessionStorage.getItem('id'),
    addressId: selectedAddress.value,
    paymentType: 4,
    commodityId: item.commodityId,
    commodityNumber: item.commodityNumber,
    totalPrice: item.commodityNumber * item.price,
    orderStates: 9,
    paymentTime: new Date().toISOString(),
  }));

  addOrder(orders).then(res => {
    console.log('取消支付', res);
    deletec();
    paymentDialogVisible.value = false;
    router.push('/myorder');
  }).catch(err => {
    console.error('取消支付过程中发生错误', err);
    ElMessage({
      type: 'error',
      message: '取消支付过程中发生错误',
    });
  });
}




</script>


<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.box1 {
  background-color: antiquewhite;
  text-indent: 15%;
  line-height: 0.2;
  font-size: 120%;
}

.box2 {
  background-color: white;
  text-indent: 25%;
  font-size: 150%;
  display: flex;
}


.box3 {
  background-color: white;
  float: right;
}

.xx {

  background-color: white;

}

.checkbox-container {
  display: flex;
  align-items: center;
}

.checkbox-label {
  margin-left: 8px;
  /* Adjust spacing between checkbox and label text */
  font-size: 16px;
  cursor: pointer;
  /* Change cursor to pointer to indicate it's clickable */
}

.el-radio-group {
  align-items: center;
  display: inline-flex;
  flex-wrap: wrap;
  font-size: 0;
}

.adress_list[data-v-2c101ab0] {
  margin-left: 0px;
  width: 1000px;
  height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;

}

.el-radio__input {
  cursor: pointer;
  display: inline-flex;
  outline: none;
  position: relative;
  vertical-align: middle;
  white-space: nowrap;
}

.el-radio__label {
  font-size: var(--el-radio-font-size);
  padding-left: 8px;
}

.el-radio.el-radio--large .el-radio__label {
  font-size: 14px;
}

el-radio:focus {
  outline: none;
}

.Product {
  position: relative;
}

.table1 {
  position: absolute;
  left: 57%;
  top: 40%;
  margin-left: -400px;
  margin-top: -20px;
}
</style>