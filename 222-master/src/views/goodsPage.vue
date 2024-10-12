<!-- 商品管理页面-->
<template>
  <!-- 顶部操作栏 -->
  <div class="flex justify-between align-center gap-4">
    <!-- Select 选择器部分 -->
    <div class="flex items-center gap-4">
      <el-select v-model="primaryCategory" placeholder="一级分类" class="select-width" style="margin-left: 300px">
        <el-option v-for="item in primaryOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="secondaryCategory" placeholder="二级分类" :disabled="!primaryCategory" class="select-width">
        <el-option v-for="item in filteredSecondaryOptions" :key="item.value" :label="item.label"
                   :value="item.value" />
      </el-select>
      <el-dialog v-model="addDialogVisible" title="商品" width="35%">
        <el-form :model="addForm" :rules="rules" ref="addFormRef">
          <el-form-item label="商品名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="商品价格" :label-width="formLabelWidth" prop="price">
            <el-input v-model.number="addForm.price" autocomplete="off" />
          </el-form-item>
          <el-form-item label="商品描述" :label-width="formLabelWidth" prop="description">
            <el-input type="textarea" v-model="addForm.description" placeholder="商品描述" />
          </el-form-item>
          <el-form-item label="库存" :label-width="formLabelWidth" prop="stock" class="small-input">
            <el-input v-model.number="addForm.stock" autocomplete="off" />
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth" prop="status" class="small-select">
            <el-select v-model="addForm.status" placeholder="商品状态">
              <el-option label="在售" value="1" />
              <el-option label="下架" value="0" />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="addDialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="confirmAdd">确认</el-button>
                    </span>
        </template>
      </el-dialog>
      <!-- 添加商品的对话框按钮 -->
      <el-button :type="secondaryCategory ? 'primary' : 'default'" :disabled="isAddButtonDisabled"
                 style="width: 100px; margin-top: 70px" @click="addDialogVisible = true">添加</el-button>
    </div>
    <!-- 搜索框部分 -->
    <div class="flex-1 flex items-center gap-4 justify-end" style="margin-right: 80px">
      <el-input v-model="input" placeholder="请输入商品名称" style="width: 200px;" />
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </div>
  </div>
  <!-- 描述列表 -->
  <el-table :data="goodsdata" style="width: 100%; height: 550px;" :header-cell-style="{'text-align':'center'}">
    <!-- 自定义空表格插槽 -->
    <template v-if="!goodsdata.length" #empty>
      <div style="text-align: center; padding: 200px ; color: #999;">No Data</div>
    </template>
    <el-table-column label="序号" width="250" align="center">
      <template #default="scope">
        {{ scope.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column prop="commodityName" label="名称" width="150" align="center"></el-table-column>
    <el-table-column label="图片" width="120" align="center">
      <template #default="scope">
        <img :src="scope.row.coverImg" style="width: 100%; height: auto;">
      </template>
    </el-table-column>
    <el-table-column prop="stock" label="库存" width="150" align="center"></el-table-column>
    <el-table-column prop="price" label="价格" width="150" align="center"></el-table-column>
    <el-table-column prop="statusMap" label="状态" width="150" align="center">
      <template #default="scope">
        {{ getStatusmap(scope.row.states) }}
      </template>
    </el-table-column>

    <!-- 操作列 -->
    <el-table-column label="操作" width="250" align="center">
      <template #default="scope">
        <el-button
            style="color: white; background-color: orange; border: 1px solid orange; padding: 2px 9px; border-radius: 4px; font-size: 12px; margin-right: 5px;"
            @click="handleView(scope.row)">查看</el-button>
        <el-button type="primary" style="padding: 2px 9px; font-size: 12px; margin-right: 5px;"
                   @click="handleImage(scope.row)">图片</el-button>
        <el-button type="primary" style="padding: 2px 9px; font-size: 12px; margin-right: 5px;"
                   @click="handleEdit(scope.row)">修改</el-button>
        <el-button type="danger" style="padding: 2px 9px; font-size: 12px;"
                   @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>



  <!-- 查看对话框 -->
  <el-dialog v-model="viewDialogVisible" title="查看商品" :width="'500px'" :before-close="handleClose"
             custom-class="custom-view-dialog">
    <div style="margin: 20px; line-height: 2em;">
      <div>商品名称: {{ selectedItem.commodityName }}</div>
      <div>商品价格: {{ selectedItem.price }}</div>
      <div>商品描述: {{ selectedItem.intro }}</div>
      <div>库存: {{ selectedItem.stock }}</div>
      <div>状态: {{ getStatusmap(selectedItem.states) }}</div>
      <div>
        默认图片：
        <img :src="coverImg" alt="Product Image" style="width: 20%; height: auto;">
      </div>
    </div>
    <template #footer>
      <el-button @click="viewDialogVisible = false">关闭</el-button>
      <!-- 这里可以添加其他按钮，如果需要 -->
    </template>
  </el-dialog>


  <!-- 图片对话框 -->
  <el-dialog v-model="imageDialogVisible" title="商品图片" width="30%">
    <!-- 商品图片上传 -->
    <div>商品图片
      <el-upload action="#" list-type="picture-card" :auto-upload="false" :before-remove="handleBeforeRemove"
                 :on-change="handleFileUpload" :file-list="selectedImageList">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
    </div>
    <div>
      <div>默认图片
        <img :src="coverImg" alt="Default Product Image" style="width: 20%; height: auto;">
      </div>
      <el-button type="primary" @click="showChangeDefaultDialog = true">更改默认</el-button>
    </div>
    <!-- 对话框底部按钮（原对话框的底部按钮可以保持不变） -->
    <template #footer>
      <el-button @click="imageDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="imageDialogVisible = false">确认</el-button>
    </template>
    <el-dialog v-model="showChangeDefaultDialog" title="设置默认图片" style="width: 30%; height:100%;">
      <div v-if="showChangeDefaultDialog">
        <div v-for="(file, index) in selectedImageList" :key="index">
          <img :src="file.url" alt="Product Image" style="width: 20%; height: auto; margin-right: 10px;">
          <el-button type="primary" size="mini" @click="setDefaultImage(file)">确认</el-button>
        </div>
      </div>
    </el-dialog>
  </el-dialog>

  <!-- 修改对话框 -->
  <el-dialog v-model="editDialogVisible" title="商品" width="35%">
    <el-form :model="editForm" ref="editFormRef" :rules="editRules" class="edit-form">
      <el-form-item label="商品名称" :label-width="formLabelWidth" prop="commodityName">
        <el-input v-model="editForm.commodityName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" :label-width="formLabelWidth" prop="price">
        <el-input v-model.number="editForm.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" :label-width="formLabelWidth" prop="intro">
        <el-input type="textarea" v-model="editForm.intro"></el-input>
      </el-form-item>
      <el-form-item label="库存" :label-width="formLabelWidth" prop="stock" class="narrow-input">
        <el-input v-model.number="editForm.stock" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth" prop="states" class="narrow-input">
        <el-select v-model="editForm.states">
          <el-option label="在售" value="1"></el-option>
          <el-option label="下架" value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="editDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="confirmEdit">确认</el-button>
    </template>
  </el-dialog>

  <!--分页-->
  <div class="demo-pagination-block">
    <div class="demonstration"></div>
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 50]"
                   :size="size" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
                   :total="totalData" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { get_commodityType } from "@/api";
import { addCommodity, getCommodity, deleteCommodity, updateCommodity, getCommodityImg, addCommodityImg, deleteCommodityImg, addCommodityCoverImg } from "@/api";
import { ElMessage, ElForm, ElFormItem, ElInput, ElButton, ElMessageBox } from 'element-plus';
import { Plus } from '@element-plus/icons-vue'

// 分类过后按钮”添加“的禁止
const isAddButtonDisabled = computed(() => {
  return !secondaryCategory.value;
});

// 分类数据
const type = ref([]);
let categories = ref([]); // 使用 ref 来持有转换后的类别
const totalData = ref([])// 初始化用户总数量
const currentPage = ref(1); // 当前页码
const pageSize = ref(10); // 每页显示的条目数
const isSearching = ref(false);

function transformCategories(categories) {
  const result = [];
  categories.forEach(category => {
    if (category.typeLevel === 1) {
      const items = category.children.map(child => child.typeName);
      const itemsid = category.children.map(child => child.id);
      result.push({ title: category.typeName, items, id: category.id, cid: itemsid });
    }
  });
  return result;
}

// 处理当前页码变化
function handleCurrentChange(newPage) {
  currentPage.value = newPage; // 更新当前页码
  getGoods();
}
function handleSizeChange(newSize) {
  pageSize.value = newSize; // 更新每页显示的条目数
  getGoods();
}

onMounted(async () => {
  getGoodstype();
});
function getGoodstype() {
  // 调用获取商品数据的接口getDataList, 接口要求传递空对象
  get_commodityType({}).then((res) => {
    if (res && res.data) {
      type.value = res.data;
      categories.value = transformCategories(type.value); // 更新转换后的类别
    } else {
      console.error('未获取到有效的商品类型');
    }

  }).catch((err) => {
    console.log('获取商品类型时发生错误', err);
  });
}

const primaryCategory = ref('');
const secondaryCategory = ref('');

// 动态生成一级分类选项
const primaryOptions = computed(() => {
  return categories.value.map(category => ({
    value: category.id,
    label: category.title
  }));
});

// 根据一级分类动态生成二级分类选项
const filteredSecondaryOptions = computed(() => {
  const selectedCategory = categories.value.find(category => category.id === primaryCategory.value);
  return selectedCategory ? selectedCategory.cid.map((id, index) => ({ value: selectedCategory.items[index], label: selectedCategory.items[index], id })) : [];
});

// 获取商品数据
watch([primaryCategory, secondaryCategory], () => {
  resetSearchMode();
  getGoods(); // 重新加载基于分类的商品数据
});

const goodsdata = ref([]);

const statusMap = {
  '0': '下架',
  '1': '在售'
};

const getStatusmap = (states) => {
  return statusMap[states] || '未知状态';
};

function getGoods() {
  let data = {
    page: currentPage.value,
    pageSize: pageSize.value,
  };

  if (isSearching.value) {
    // 如果处于搜索模式，则使用搜索条件
    data.commodityName = input.value;
    getCommodity(data).then((res) => {
      if (res && res.data) {
        goodsdata.value = res.data.records;
        totalData.value = res.data.total;
      } else {
        console.error('未获取到有效的商品');
      }
    }).catch((err) => {
      console.log('获取商品时发生错误', err);
    });
  } else if (secondaryCategory.value) {
    // 如果不是搜索模式且选择了二级分类，则使用分类条件
    const selectedOption = filteredSecondaryOptions.value.find(option => option.value === secondaryCategory.value);
    if (selectedOption) {
      data.typeId = selectedOption.id; // 注意这里可能需要调整，因为通常typeId不是从二级分类直接获取的
      getCommodity(data).then((res) => {
        if (res && res.data) {
          goodsdata.value = res.data.records;
          totalData.value = res.data.total;
        } else {
          console.error('未获取到有效的商品');
        }
      }).catch((err) => {
        console.log('获取商品时发生错误', err);
      });
    }
  }
}

//搜索
const input = ref('')
function handleSearch() {
  isSearching.value = true; // 设置为搜索模式
  primaryCategory.value = null;
  secondaryCategory.value = null;
  getGoods(); // 重新加载商品数据
}

function resetSearchMode() {
  isSearching.value = false; // 重置为非搜索模式
}

// 添加商品
const addFormRef = ref()
const addDialogVisible = ref(false)
const addForm = reactive({
  name: '',
  price: '',
  description: '',
  stock: '',
  status: '',
})

const formLabelWidth = '120px'

function confirmAdd() {
  // 执行表单验证
  addFormRef.value.validate((valid) => {
    if (valid) {
      let selectedOption = filteredSecondaryOptions.value.find(option => option.value === secondaryCategory.value);
      const data = {
        commodityName: addForm.name,
        price: addForm.price,
        intro: addForm.description,
        stock: addForm.stock,
        states: addForm.status,
        typeId: selectedOption.id
      }
      addCommodity(data).then((res) => {
        // 处理响应
        // 判断接口返回的数据code是否为1
        if (res.code === 1) {
          // 清空表单
          Object.keys(addForm).forEach(key => { addForm[key] = ''; });
          addDialogVisible.value = false;
          getGoods();

        } else {
          ElMessage.error('商品已存在');
        }
      }).catch((error) => {
        console.error('添加失败:', error);
        ElMessage.error('商品已存在');
      })
    }
  });
}

const selectedItem = ref(null);



//对话框
const rules = {
  name: [
    { required: true, message: '请输入商品名', trigger: 'blur' }
  ],
  price: [
    { required: true, message: '请输入商品价格', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '请输入商品描述', trigger: 'blur' }
  ],
  stock: [
    { required: true, message: '请输入库存数', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '请选择商品状态', trigger: 'blur' }
  ]
};

// 定义对话框的显示状态
const viewDialogVisible = ref(false);
const imageDialogVisible = ref(false);
const editDialogVisible = ref(false);

//查看
function handleView(row) {
  selectedItem.value = {
    commodityName: row.commodityName,
    price: row.price,
    intro: row.intro,
    stock: row.stock,
    states: row.states,
    coverImg: row.coverImg
  };
  viewDialogVisible.value = true;
}

const selectedImageList = ref([]);
const coverImg = ref(null);
//图片按钮
const commodityId = ref(null);
function handleImage(row) {
  commodityId.value = row.id;
  getCommodityImg({ commodityId: commodityId.value }).then((res) => {
    console.log('请求成功返回的数据', res);
    selectedImageList.value = res.data;

    console.log(selectedImageList.value);
  }).catch((err) => {
    console.log('请求失败返回的数据', err);
  });
  coverImg.value = row.coverImg;
  console.log(coverImg.value);
  imageDialogVisible.value = true;
}

//添加图片
let newUploadedImage = null;
function handleFileUpload(file) {
  const formData = new FormData();
  formData.append('file', file.raw);
  formData.append('commodityId', commodityId.value);
  addCommodityImg(formData)
      .then(response => {
        console.log('上传成功', response);
        newUploadedImage = file;
        getGoods();
      })
      .catch(error => {
        console.error('上传失败', error);
      });
}

//删除图片
function handleBeforeRemove(file, fileList) {
  console.log('fileList:', fileList);
  const fileId = file.id;
  deleteCommodityImg({ id: fileId }).then((res) => {
    console.log('请求成功返回的数据', res);
  }).catch((err) => {
    console.log('请求失败返回的数据', err);
  });
}

//更改默认图片
const showChangeDefaultDialog = ref(false);

function setDefaultImage(file) {
  if (newUploadedImage) {
    coverImg.value = newUploadedImage.imageAddress || newUploadedImage.url;
    addCommodityCoverImg({ coverImg: coverImg.value, id: commodityId.value })
        .then(response => {
          console.log('上传成功', response);
          // 更新商品列表中的图片
          const updatedGoods = goodsdata.value.map(good => {
            if (good.id === commodityId.value) {
              return {...good, coverImg: coverImg.value };
            }
            return good;
          });
          goodsdata.value = updatedGoods;
          // 更新查看对话框中的图片路径
          if (selectedItem.value && selectedItem.value.id === commodityId.value) {
            selectedItem.value.coverImg = coverImg.value;
          }
        })
        .catch(error => {
          console.error('上传失败', error);
        });
    newUploadedImage = null;
  } else {
    coverImg.value = file.imageAddress;
    addCommodityCoverImg({ coverImg: coverImg.value, id: commodityId.value })
        .then(response => {
          console.log('上传成功', response);
          // 更新商品列表中的图片
          const updatedGoods = goodsdata.value.map(good => {
            if (good.id === commodityId.value) {
              return {...good, coverImg: file.imageAddress };
            }
            return good;
          });
          goodsdata.value = updatedGoods;
          // 更新查看对话框中的图片路径
          if (selectedItem.value && selectedItem.value.id === commodityId.value) {
            selectedItem.value.coverImg = file.imageAddress;
          }
        })
        .catch(error => {
          console.error('上传失败', error);
        });
  }
  showChangeDefaultDialog.value = false;
}

//修改
const editRef = ref()
const editForm = ref({
  commodityName: '',
  price: '',
  intro: '',
  stock: '',
  states: ''
});
const editdatas = ref({});

function handleEdit(row) {
  editForm.value = {
    commodityName: row.commodityName,
    price: row.price,
    intro: row.intro,
    stock: row.stock,
    states: row.states
  };
  editdatas.value = row;
  editDialogVisible.value = true;

}

function confirmEdit() {
  editRef.value.validate((valid) => {
    if (valid) {
      const editdata = {
        id: editdatas.value.id,
        commodityName: editForm.value.commodityName,
        price: editForm.value.price,
        stock: editForm.value.stock,
        states: Number(editForm.value.states),
        typeId: editdatas.value.typeId
      };
      updateCommodity(editdata).then((res) => {
        if (res.code === 1) {
          ElMessage.success('修改成功');
          editDialogVisible.value = false;
          getGoods();
        } else {
          ElMessage.error('修改失败');
        }
      });
    }
  });
}

// 处理删除商品的确认
function handleDelete(rowId) {
  // 表格中删除弹窗
  ElMessageBox.confirm(
      '你确定要删除吗',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }
  )
      .then(() => {
        // 用户确认删除，调用删除商品接口
        deleteCommodity({ id: rowId }).then((res) => {
          console.log('请求成功返回的数据', res);
          getGoods();
          // 给出删除成功的提示
          ElMessage({
            type: 'success',
            message: '删除成功',
          });
        })
            .catch((err) => {
              console.log('请求失败返回的数据', err);

              // 给出删除失败的提示
              ElMessage({
                type: 'error',
                message: '删除失败',
              });
            });
      })
      .catch(() => {
        // 用户取消删除，给出取消的提示
        ElMessage({
          type: 'info',
          message: '删除失败',
        });
      });
}

// 按钮修改设置为必填项
const editRules = {
  commodityName: [
    { required: true, message: '请输入商品名', trigger: 'blur' }
  ],
  price: [
    { required: true, message: '请输入商品价格', trigger: 'blur' }
  ],
  intro: [
    { required: true, message: '请输入商品描述', trigger: 'blur' }
  ],
  stock: [
    { required: true, message: '请输入库存数', trigger: 'blur' }
  ],
  states: [
    { required: true, message: '请选择商品状态', trigger: 'change' } // 对于选择框，可能更适合使用'change'作为触发时机
  ]
};


</script>

<style scoped>
/*一级和二级分类的样式的*/
.select-width {
  width: 150px;
  margin-top: 70px;
}

/*搜索框*/
.flex-1 {
  display: flex;
  align-items: center;
  /* 垂直居中，如果需要的话 */
  justify-content: flex-end;
}

/*底部分页*/
.demo-pagination-block {
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 如果你想在垂直方向也居中，可以加上这行 */
}

/* 设置Select选择器部分内部元素的样式 */
.flex.items-center.gap-4 {
  padding-left: 10px;
  /* 示例：左内边距 */
  flex: 1;

  /* 允许这个容器根据需要扩展以填充剩余空间 */
  .el-select {
    margin-right: 10px;
    /* 为每个Select选择器右侧添加一些空间 */
  }
}

/* 搜索框部分的外层容器样式 */
.flex-1.flex.items-center.gap-4 {
  padding-right: 10px;
  /* 示例：右内边距 */
  margin-top: -30px;
}

/*添加对话框里面的库存*/
.small-input .el-input {
  width: 250px;
  /* 或你需要的任何宽度 */
}

/*添加对话框里面的状态*/
.small-select .el-select {
  width: 100px;
  /* 设置宽度 */
}

/*下面两个是一起的 */
.narrow-input .el-input {
  width: 300px;
  /* 或者您需要的任何宽度 */
}

.narrow-input .el-select {
  width: 150px;
  /* 或者您需要的任何宽度 */
}

/* 滚动条样式（可选） */
.el-textarea__inner {
  /* 自定义滚动条样式，这里只是示例 */
  scrollbar-width: thin;
  /* Firefox */
  scrollbar-color: darkgrey lightgrey;
  /* Chrome, Safari, Edge */
}

/* 添加CSS样式来向左移动“更改默认”按钮 */
.move-left {
  margin-left: -85px;
  /* 或者使用 transform: translateX(-20px); 根据需要选择 */
  margin-top: 40px;
}
</style>
