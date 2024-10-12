<template>
  <div>
    <div>
    <el-input v-model="input" style="width: 240px" placeholder="请输入订单编号" />
    <el-button type="primary">搜索</el-button> 
    </div>
    <div >
        <el-table class="tb" :data="tableData" style="width: 100%" >
    <el-table-column prop="orderNumber" label="订单编号" width="150" />
    <el-table-column prop="commodityName" label="商品" width="200" >
      <template #default="scope">
        <p>{{ `${scope.row.commodityName}` }}</p>
        
        <el-image :src="scope.row.coverImg" style="height: 60%;width: 60%;"></el-image>
        </template>
    </el-table-column>
    <el-table-column prop="price" label="单价" width="100" />
    <el-table-column prop="commodityNumber" label="商品数量" width="100" />
    <el-table-column prop="totalPrice" label="总价" width="100" />
    <el-table-column prop="payment" label="付款类型" width="100" >
    <template #default="scope">
        {{ getStatusmap(scope.row.paymentType) }}
      </template>
    </el-table-column>
    <el-table-column prop="updateTime" label="更新时间" width="100" />
    <el-table-column prop="name" label="状态" width="100" >
    <template #default="scope">
        {{ getStatusText(scope.row.orderStates) }}
      </template>
    </el-table-column>
    <el-table-column prop="address" label="操作" width="200">
      <template #default="scope">
        <el-button plain type="info" size="small" @click="openDialog(scope.row)">
          详情
        </el-button>
        <el-button plain type="warning" size="small" @click="editOrder(scope.row)">
          编辑
        </el-button>
        <el-button plain type="danger" size="small" @click="deleteRow(scope.row.id)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

    </div>

    <el-dialog v-model="dialogVisible" title="Warning" width="500">
      <div>
      <p><strong>订单编号：</strong>{{selectedRow.orderNumber }}</p>
      <p><strong>商品图片：</strong>
        <el-image :src="selectedRow.coverImg" class="tupian"></el-image>
      </p>
      <p><strong>商品名称：</strong>{{ selectedRow.commodityName }}</p>
      <p><strong>商品价格：</strong>{{ selectedRow.price }}</p>
      <p><strong>商品数量：</strong>{{ selectedRow.commodityNumber }}</p>
      <p><strong>总价：</strong>{{ selectedRow.totalPrice }}</p>
      <p><strong>付款类型：</strong>{{ getStatusmap(selectedRow.paymentType) }}</p>
      <p><strong>收货人姓名：</strong>{{ selectedRow.receiverName }}</p>
      <p><strong>收货人电话：</strong>{{ selectedRow.receiverPhone }}</p>
      <p><strong>地址：</strong>{{ selectedRow.address }}</p>
      <p><strong>详细地址：</strong>{{ selectedRow.detailedAddress }}</p>
      <p><strong>订单状态：</strong>{{ getStatusText(selectedRow.orderStates) }}</p>
      <p><strong>货运单号：</strong>{{ selectedRow.shippingNumber }}</p>

    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>

    <el-dialog v-model="editDialogVisible" title="状态变化" :before-close="handleEditClose" width="500">
      <el-form ref="editOrderRef" :model="editOrderForm">
        <el-form-item label="状态">
          <el-cascader :options="options" v-model="editOrderForm.status" @change="handleChangeStatus"></el-cascader>
        </el-form-item>
      </el-form>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="editDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="saveEditedOrder">确定</el-button>
    </span>
      </template>
    </el-dialog>

  </div>
</template>


<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, ref, watch } from 'vue';
import { getAllOrderList, deleteOrder, updateOrder } from "@/api/index.js";

const input = ref('');
const editDialogVisible = ref(false);
const editOrderRef = ref();
const editdatas = ref({});
const editOrderForm = ref({
  status: ''
});

const dialogVisible = ref(false);
const selectedRow = ref({});
const openDialog = (row) => {
  selectedRow.value = row;
  dialogVisible.value = true;
};

const options = [
  {
    value: '9',
    label: '待付款',
  },
  {
    value: '1',
    label: '待发货',
  },
  {
    value: '2',
    label: '待收货',
  },
  {
    value: '3',
    label: '已收货',
  },
  {
    value: '4',
    label: '退货中',
  },
  {
    value: '5',
    label: '已退货',
  },
  {
    value: '10',
    label: '已取消',
  },
];

const paymentMap = {
  '1': '微信',
  '2': '支付宝',
  '3': '银联',
};

const getStatusmap = (status) => {
  return paymentMap[status] || '未支付';
};

const statusMap = {
  '9': '待付款',
  '1': '待发货',
  '2': '待收货',
  '3': '已收货',
  '4': '退货中',
  '5': '已退货',
  '10': '已取消'
};

const getStatusText = (status) => {
  return statusMap[status] || '未知状态';
};

const tableData = ref([]);

onMounted(async () => {
  GetAllOrderList();
});

function GetAllOrderList() {
  getAllOrderList({}).then((res) => {
    if (res && res.data) {
      tableData.value = res.data;
    } else {
      console.error('未获取到有效的订单类型');
    }
  }).catch((err) => {
    console.log('获取订单类型时发生错误', err);
  });
}

function editOrder(row) {
  editOrderForm.value = {
    status: row.orderStates.toString()
  };
  editdatas.value = row;
  editDialogVisible.value = true;
}

function saveEditedOrder() {
  editOrderRef.value.validate((valid) => {
    if (valid) {
      const editdata = {
        id: editdatas.value.id,
        orderStates: editOrderForm.value.status.toString()
      };
      if (editdatas.value.orderStates === '1' && editOrderForm.value.status === '2') {
        // 如果从待发货切换到已发货
        updateOrder(editdata).then((res) => {
          if (res.code === 1) {
            ElMessage.success('状态更新为已发货成功');
            GetAllOrderList();
            editDialogVisible.value = false;
          } else {
            ElMessage.error('修改失败');
          }
        });
      } else {
        // 其他状态的更新
        updateOrder(editdata).then((res) => {
          if (res.code === 1) {
            ElMessage.success('修改成功');
            GetAllOrderList();
            editDialogVisible.value = false;
          } else {
            ElMessage.error('修改失败');
          }
        });
      }
    }
  });
}

function deleteRow(rowId) {
  ElMessageBox.confirm(
      '你确定要删除吗？',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }
  )
      .then(() => {
        deleteOrder({ id: rowId }).then((res) => {
          console.log('请求成功返回的数据', res);
          GetAllOrderList();
          ElMessage({
            type: 'success',
            message: '删除成功',
          });
        })
            .catch((err) => {
              console.log('请求失败返回的数据', err);
              ElMessage({
                type: 'error',
                message: '删除失败',
              });
            });
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '放弃删除',
        });
      });
}

// 添加 watch 来监听状态的变化
watch(editOrderForm.value.status, (newValue, oldValue) => {
  const currentState = editdatas.value.orderStates;
  if (currentState === '2' && newValue === '1') {
    ElMessage.warning('已处于待收货状态，不能切换为待发货状态');
    editOrderForm.value.status = oldValue;
  } else if (currentState === '3' && newValue === '1') {
    ElMessage.warning('已收货，不能切换为待发货状态');
    editOrderForm.value.status = oldValue;
  } else if (currentState === '4' && newValue === '1') {
    ElMessage.warning('退货中，不能切换为待发货状态');
    editOrderForm.value.status = oldValue;
  } else if (currentState === '5' && newValue === '1') {
    ElMessage.warning('已退货，不能切换为待发货状态');
    editOrderForm.value.status = oldValue;
  } else if (currentState === '10' && newValue === '1') {
    ElMessage.warning('已取消，不能切换为待发货状态');
    editOrderForm.value.status = oldValue;
  } else if (currentState === '2' && newValue!== '2') {
    ElMessage.warning('已发货状态不能更改');
    editOrderForm.value.status = oldValue;
  }
});
</script>
<style>
.tb{
overflow-y: scroll;

}

.tupian {
  width: 80px;
  height: 80px;
}

</style>
