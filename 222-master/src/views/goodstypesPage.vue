<template>
  <div class="common-layout">
    <el-container class="common-layout">
      <el-header>
        <el-button type="primary" @click="handleEdit" style="padding:16px 35px;">
          添加
        </el-button>
        <!-- 添加对话框 -->
        <el-dialog v-model="dialogVisible" title="添加分类" width="400" center style="">
          <template #footer>
            <el-form :model="addForm" label-width="auto" :rules="rules" style="max-width: 400px;">
              <el-form-item label="分类名" prop="name">
                <el-input style="width: 200px;" v-model="addForm.typeName" />
              </el-form-item>
              <el-form-item label="类别">
                <el-select v-model="addForm.parentId" placeholder="分类" style="width: 200px;">
                  <el-option v-for="item in type" :key="item.typeName" :label="item.typeName" :value="item.typeName" />
                </el-select>
              </el-form-item>
              <el-form-item style="margin-left: 60%;">
                <el-button type="primary" @click="add">确认</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-dialog>

        <el-main class="common-layout" style="width: 90%;margin: 0% 5%;">
          <el-table :data="type" height="520" style="margin: auto;" row-key="id"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :default-expand-all="true">
            <el-table-column prop="typeName" label="分类名" align="center" />
            <el-table-column label="类别" align="center">
              <template v-slot="{ row }">
                <div>
                  <el-button v-if="row.typeLevel === 1" type="primary" plain size="small">一级</el-button>
                  <el-button v-else-if="row.typeLevel === 2" type="success" plain size="small">二级</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-button type="primary" @click="edit(scope.row)">修改</el-button>
                <el-button type="danger" @click="deleteRow(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
        <!-- 修改对话框 -->
        <el-dialog v-model="dialogVisible2" title="修改信息" width="400" center>
          <template #footer>
            <el-form :model="editForm" label-width="auto" :rules="rules" style="max-width: 400px;">
              <el-form-item label="分类名" prop="name">
                <el-input style="width: 200px;" v-model="editForm.typeName" />
              </el-form-item>
              <el-form-item label="类别">
                <el-select v-model="editForm.parentTypename" placeholder="分类" style="width: 200px;">
                  <el-option v-for="item in type" :key="item.typeName" :label="item.typeName" :value="item.typeName" />
                </el-select>
              </el-form-item>
              <el-form-item style="margin-left: 60%;">
                <el-button type="primary" @click="editconfirm">确认</el-button>
                <el-button @click="dialogVisible2 = false">取消</el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-dialog>
      </el-header>

    </el-container>

  </div>
</template>


<script setup>
import { onMounted, ref } from "vue";
import request from "@/api/request";
import { ElMessage, ElMessageBox } from "element-plus";
import { addType, commodityType, editType, typeDelete } from "@/api";

const type = ref([])
const dialogVisible = ref(false)
const dialogVisible2 = ref(false)
const rules = ref({
  name: [
    { required: true, message: '请输入分类名', trigger: 'blur' },
    { min: 1, max: 10, message: '长度在1到10个字符', trigger: 'blur' },
  ]
})
const addForm = ref({
  children: [],
  id: null,
  typeName: '',
  typeLevel: 1,
  parentId: null
})
const editForm = ref({
  children: [],
  id: '',
  typeName: '',
  typeLevel: '',
  parentId: null,
  parentTypename:'',
});

onMounted(async () => {
  try {
    let response = await request.get('/admin/commodityType');
    type.value = response.data
    console.log('type', type.value)
  } catch (err) {
    console.error('炸', err);
  }
})

function handleEdit() {
  dialogVisible.value = true;
}

function getType() {
  const data = {}
  commodityType(data).then((res) => {
    type.value = res.data;
    console.log(type.value)
  });
}

function deleteRow(rowId) {
  ElMessageBox.confirm(
    '你确定要删除吗？',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }
  ).then(() => {
    typeDelete({ id: rowId.id }).then((res) => {
      console.log('√', res);

      getType();

      ElMessage({
        type: 'success',
        message: '删除成功',
      });
    }).catch((err) => {
      console.log('炸', err);

      ElMessage({
        type: 'error',
        message: '删除失败',
      });
    });
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '删除失败',
    });
  });
}

function add() {
  try {
    if (addForm.value.parentId) {
      addForm.value.typeLevel = 2;
      const parentType = type.value.find(item => item.typeName === addForm.value.parentId)
      addForm.value.parentId = parentType.id
      // console.log(parentType.value)
    } else {
      addForm.value.typeLevel = 1
      addForm.value.parentId = null
    }
    addType(addForm.value)
    ElMessage.success('添加成功')
    dialogVisible.value = false
    getType()
  } catch (error) {
    console.error('添加分类时发生地错误', error);
    ElMessage.error('添加失败，请稍后重试');
  }

}

function edit(x) {
  try {
    dialogVisible2.value = true
    // console.log('111', x)
    editForm.value.typeName = x.typeName
    editForm.value.id = x.id
    if (x.typeLevel === 1) {
      editForm.value.typeLevel = 1
    } else {
      editForm.value.typeLevel = 2
      const x1 = type.value.find(item => item.id === x.parentId)
      editForm.value.parentTypename = x1.typeName
      // console.log('555',editForm.value.parentTypename)
      editForm.value.parentId = x1.id
    }
    // editType(editForm.value)
    // ElMessage.success('修改成功')
    // dialogVisible2 = false
    
    getType()
  } 
  catch (error) {
    console.error('修改分类时发生地错误', error);
    ElMessage.error('修改失败，请稍后重试');
  }
}

function editconfirm(){
  try{
    editType(editForm.value)
    ElMessage.success('修改成功')
    dialogVisible2.value = false
    getType()
  }catch(error){
    console.error('444',error)
    ElMessage.error('修改失败，请稍后重试')
  }
  // editType(editForm.value)
  // ElMessage.success('修改成功')
}

</script>

<style scoped>
.default {
  margin: 0;
  border: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* background: aqua; */
  height: 500px;
  width: 500px;
}
</style>