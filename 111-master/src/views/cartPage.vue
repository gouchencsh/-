<template>

  <body style="border: 0px;margin: 0px;padding: 0px;">

    <div class="container">
      <el-container>

        <el-header style="display: flex;justify-content: center;">
          <div style="width: 1200px;height: 43.2px;">
            <div style="margin-left: 70px;font-size: large;font-weight: bold;width: 100px;">我的购物车</div>
            <div style="margin-left: 80px;font-size: large;text-align: left;">My Cart</div>
          </div>
        </el-header>

        <el-main>
          <div class="common">
            <!-- {{ tableData }} -->
            <el-table ref="multipleTableRef" :data="tableData" style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" />

              <el-table-column prop="commodityName" label="商品名称" />

              <el-table-column prop="coverImg" label="商品图片">
                <template #default="scope">
                  <el-image :src="scope.row.coverImg" style="width: 100px;"></el-image>
                </template>
              </el-table-column>

              <el-table-column prop="price" label="商品价格" />

              <el-table-column prop="commodityNumber" label="商品数量">
                <template #default="scope">
                  <el-input-number @change="update(scope.row)" v-model="scope.row.commodityNumber" :min="1" />
                </template>
              </el-table-column>

              <el-table-column label="操作">
                <template #default="scope">
                  <el-button type="danger" @click="deleteRow(scope.row)">删除</el-button>
                </template>
              </el-table-column>

            </el-table>
          </div>
          <div style="display: flex;justify-content: center;">
            <div style="width: 1300px; height: 31.99px;background-color:#b9dddd;display: flex;">
              <el-pagination v-model:current-page="currentPage" 
              :page-size="5" 
              layout="total, prev, pager, next" 
              v-if="trueLen"
              :total="trueLen"
              @size-change="handleSizeChange" 
              @current-change="handleCurrentChange" />
            </div>
          </div>
        </el-main>

        <el-footer style="display: flex;justify-content: center;">
          <div style="width: 1300px; height: 49.9px;display: flex;">
            <el-button size=small style="margin-top: 15px;" @click="open">批量删除</el-button>
            <div style="display: flex;margin-left: auto;">
              <p>共 {{ totalItems }} 件商品</p>
              <p style="margin-left: 30px;">合计 ¥{{ totalPrice }}</p>
            </div>
            <el-button @click="goToSettlement" size="large" type="danger" style="margin-top: 6px;margin-right: 50px;">
              <span>去结算</span>
            </el-button>
          </div>
        </el-footer>

      </el-container>
    </div>

  </body>

</template>

<script setup>
import { onMounted, ref, computed } from "vue"
import { getDataList } from "@/api/index";
import axios from "axios";
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRoute } from "vue-router";
import requests from "@/api/request";
import { deleteCart } from "@/api/index";
import { updateCart } from "@/api/index";
import router from '@/router';

const trueLen = ref()
const tableData = ref([])
const multipleSelection = ref([])
const totalItems = ref()
const currentPage = ref(1)
const pageSize = ref(5)

const userId = localStorage.getItem('id')

const totalPrice = computed(() => {
  return multipleSelection.value.reduce((sum, item) => sum + item.price * item.commodityNumber, 0)
});

// 勾选表格数据后触发此方法, 获取勾选的数据列表  
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
  console.log('Updated selection:', multipleSelection.value);
};

function handleSizeChange(newSize) {
  pageSize.value = newSize;
  getTable();
}

function handleCurrentChange(newPage) {
  currentPage.value = newPage;
  getTable();
}

//hasSelectedItems 是一个计算属性，用于检查 selectedItems 是否有选中的项目
const hasSelectedItems = computed(() => multipleSelection.value.length > 0);

onMounted(() => {
  getTable()
})


function getTable() {
  const data = {
    page: currentPage.value,
    userId: userId,
    // currentPage: 1,
    pageSize: pageSize.value,
  }
  // 调用获取表格数据的接口getDataList
  getDataList(data).then((res) => {
    console.log('请求成功返回的数据', res);
    // 从接口返回的数据res中将属于table列表的数据提取出来, 赋值给tableData变量
    tableData.value = res.data.records;
    totalItems.value = tableData.value.length;
    trueLen.value = res.data.total;
  }).catch((err) => {
    console.log('请求失败返回的数据', err);
  });
}
function deleteRow(rowId) {
  // 表格中删除弹窗    
  ElMessageBox.confirm(
    '确定要删除吗？',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      // 用户确认删除，调用删除购物车接口    
      deleteCart({ id: [rowId.id] }).then((res) => {
        console.log('请求成功返回的数据', res);
        getTable();// 调用方法 更新购物车

        // 给出删除成功的提示    
        ElMessage({
          type: 'success',
          message: 'Delete completed',
        });
      })
        .catch((err) => {
          console.log('请求失败返回的数据', err);

          // 给出删除失败的提示    
          ElMessage({
            type: 'error',
            message: 'Delete failed',
          });
        });
    })
    .catch(() => {
      // 用户取消删除，给出取消的提示    
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      });
    });
}
const open = async () => {
  const rowIds = multipleSelection.value.map(item => item.id);
  if (!hasSelectedItems.value) {
    ElMessage({
      type: 'warning',
      message: '请选择商品',
    });
    return;
  }

  ElMessageBox.confirm(
    '确定要删除这些商品吗？',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      // 用户确认删除，调用删除购物车接口  
      const deletePromises = rowIds.map(rowId =>
        deleteCart({ id: [rowId] })
          .then(res => {
            console.log('删除成功', res);
          })
          .catch(err => {
            console.error('删除失败', err);
            // 可以在这里处理单个失败，但注意这不会阻止 Promise.all 解决  
            // 如果需要所有操作都成功才继续，则应该抛出错误  
            throw new Error('One or more deletions failed');
          })
      );

      // 等待所有删除请求完成  
      Promise.all(deletePromises)
        .then(() => {
          // 所有删除请求都成功了（或至少没有未捕获的错误）  
          ElMessage({
            type: 'success',
            message: 'Delete completed',
          });
          getTable(); // 调用方法 更新购物车  
        })
        .catch(() => {
          // 至少有一个删除请求失败了（或我们故意抛出了错误）  
          ElMessage({
            type: 'error',
            message: 'Delete failed',
          });
        });
    })
    .catch(() => {
      // 用户取消删除  
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      });
    });

};
function goToSettlement() {
  if (!hasSelectedItems.value) {
    ElMessage({
      type: 'warning',
      message: '请选择商品',
    });
    return;
  } else {
    const rowIds = multipleSelection.value.map(item => item.id)
    router.push({path:'/confirmorder',query:{arrayParam:rowIds}});
    console.log("00000",rowIds)
  }
}

function update(row) {
  updateCart({ commodityNumber: row.commodityNumber, id: row.id }).then((res) => {
    console.log('111', res);
  }).catch((err) => {
    console.log('222', err);
  })
}




</script>




<style scoped>
.container {
  position: relative;
  background-color: rgb(185, 215, 222);
  border: 0;
  /* height: 549.99px; */
  width: 100%;
  /* display: flex;
  flex-direction: column; */
}

.el-header {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 50px;
  background-color: #D9D5D5;
}

.el-main {
  margin: 0;
  margin-bottom: 100px;
  padding: 0;
  width: 1300px;
  height: 50%;
  background-color: white;
  margin-top: 20px;
  align-self: center;
}

.el-footer {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 50px;
  background-color: #D9D5D5;
  position: absolute;
  bottom: 0;
  align-self: center;
}

.common {
  margin: 0;
  border: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
