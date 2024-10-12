<template>

  <el-button plain @click="dialogFormVisible = true">
    Open a Form nested Dialog
  </el-button>



  <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
    <el-form :model="form">

      <el-form-item label="Zones" :label-width="formLabelWidth">

      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
      
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script  setup>
import { reactive, ref } from 'vue'

const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({

})


</script>
