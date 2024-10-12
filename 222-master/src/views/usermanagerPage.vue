
<script setup>

</script>
<template>
    <div class="background">
        <!-- 顶部导航栏 -->

    <!-- 分割线 -->

    <div class="main">

      <div style="display: flex; justify-content: space-between; align-items: center; "> 
        <div style="display: flex; align-items: center;">
          <el-button type="primary" >添加</el-button>
        <el-input v-model="input" placeholder="请输入手机号" style="width: 200px; margin-left: 10px; margin-right: 10px;"/>
        <el-button type="primary" >搜索</el-button>
        </div>
     
        <el-button type="danger" class="sc">批量删除</el-button>
    

      </div>
      <div>
 
      </div>

       




        <el-table class="table" :data="tableData"   style="width: 100%">
          <el-table-column type="selection" width="55" />

          <el-table-column prop="receiverName" label="账号" width="120" align="center" />
          <el-table-column prop="receiverName" label="用户名" width="120" align="center" />
          <el-table-column prop="receiverName" label="角色" width="120" align="center" />
          <el-table-column prop="receiverName" label="状态" width="120" align="center" />

         
          <el-table-column prop="receiverPhone" label="手机号" width="200" align="center" />
          <el-table-column prop="receiverName" label="邮箱" width="120" align="center" />
    
          <el-table-column prop="data" label="操作" width="150" align="center">
            <template #default="scope">
              <el-button  size="small" type="primary" plain @click="getAdd(scope.row)">
                编辑
              </el-button>
              <el-button size="small" type="danger" plain @click="handleDelete(scope.row)">
                删除
              </el-button>


            </template>

          </el-table-column>


        
        </el-table>


     </div>



    </div>
</template>
<style scoped> 
.main {

  background: #fff;

}
 .table {
  margin-top: 40px;

}

 .background {
    background-color: #fffbfb;
    height: 100%;
    width: 80%;
    float: right;


   
  }
  .sc {

    margin-left: 20px;
    font-size: 16px;
   
  }

</style>

