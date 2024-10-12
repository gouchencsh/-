<script setup>
import tx from '../assets/tx1.jpg';
// 



import { Delete, User } from '@element-plus/icons-vue'
import { Check } from '@element-plus/icons-vue'
import { ShoppingTrolley } from '@element-plus/icons-vue'
import { MapLocation } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { addAddress, updateAddress } from '../api/index';
import { myMessage } from '../api/index';
import { updateMyMessage } from '../api/index';
import { updateMyPassword } from '../api/index';
import { reactive, ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getAddress1 } from '../api/index';
import { deleteAddress } from '../api/index';
import { setDefaultAddress } from '../api/index';

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({

})
const router = useRouter()
const value = ref([])
const active = ref('first');
const isActive = ref(true);
const isInputDisabled = ref(true);
const oldpassword = ref('');
const newpassword1 = ref('');
const newpassword2 = ref('');
const userInfo1 = ref([]);
const userInfo = ref({});
const newphone = ref('');
const newemail = ref('');
const yzm3 = ref('');
const yzm4 = ref('');
const yzm1 = ref('');
const yzm2 = ref('');
const selectedOptions = ref([]);
const userInfo2 = ref({});
let shr = ref('');
let xxdz = ref('');
let sjh = ref('');
let shr1 = ref('');
let xxdz1 = ref('');
let sjh1 = ref('');
const dialogVisible = ref(false);


let reUserPwd = ref('')



onMounted(async () => {
  try {
    const response = await myMessage({ id: localStorage.getItem('id') });
    const response1 = await getAddress1({ userId: localStorage.getItem('id') });

    if (response && response.data) {
      userInfo.value = response.data; // 将返回的数据赋值给 userInfo


    }
    if (response1 && response1.data) {
      userInfo1.value = response1.data; // 将返回的数据赋值给 userInfo1
    }

  } catch (error) {
    console.error('获取接口信息失败', error);
  }
});



const handleDelete = async (row) => {
  try {
    const response = await deleteAddress({ id: row.id });
    const response1 = await getAddress1({ userId: localStorage.getItem('id') });
    // const response2 = await deleteAddress(response1.data.id);
    userInfo1.value = response1.data; // 将返回的数据赋值给 userInfo1
  } catch (error) {
    console.error('删除地址失败', error);
  }
};

const handleUpdate = async () => {
  console.log('要更新的 row 对象:');

  try {
    const response = await updateAddress({
      id: adderssForm.id,
      isDefault: adderssForm.isDefault,
      receiverAddress: adderssForm.receiverAddress,
      receiverCity: adderssForm.receiverAddressData[1],
      receiverDistrict: adderssForm.receiverAddressData[2],
      receiverName: adderssForm.receiverName,
      receiverPhone: adderssForm.receiverPhone,
      receiverProvince: adderssForm.receiverAddressData[0],
      userId: localStorage.getItem('id')
    });
    dialogFormVisible.value = false;
    ElMessage.success('修改成功')
    const response1 = await getAddress1({ userId: localStorage.getItem('id') })
    userInfo1.value = response1.data;
  } catch (error) {
    console.error('信息更新失败', error);
  }
};

const setMoren = async (row) => {
  try {
    const response = await setDefaultAddress({
      id: row.id,
      userId: localStorage.getItem('id'),
    });
    const response1 = await getAddress1({ userId: localStorage.getItem('id') })
    userInfo1.value = response1.data;
  } catch (error) {
    console.error('设置默认地址失败', error);
  }
};
const adderssForm = reactive({
  id: '',
  isDefault: 0,
  receiverName: '',
  receiverPhone: '',
  receiverAddress: '',
  receiverAddressData: []
})
const getAdd = async (row) => {


  dialogFormVisible.value = true;
  adderssForm.id = row.id;
  adderssForm.isDefault = row.isDefault;
  adderssForm.receiverName = row.receiverName;
  adderssForm.receiverPhone = row.receiverPhone;
  adderssForm.receiverAddress = row.receiverAddress;
  adderssForm.receiverAddressData = [row.receiverProvince, row.receiverCity, row.receiverDistrict];
}


const setYzm1 = async () => {
  const characters = '0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += characters[Math.floor(Math.random() * characters.length)];
  }
  yzm1.value = captcha;
  console.log(yzm1.value);
  ElMessage({ message: captcha, type: 'success' });


}
const setYzm2 = async () => {
  const characters = '0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += characters[Math.floor(Math.random() * characters.length)];
  }
  yzm2.value = captcha;
  ElMessage({ message: captcha, type: 'success' });
  console.log(yzm2.value);


}
const setPhone = async (value) => {
  active.value = value;
  isActive.value = !isActive.value;

  if (yzm1.value === yzm3.value && yzm2.value === yzm4.value) {
    userInfo.value.phone = newphone.value;
  }
  else {
    alert("验证码错误");
    console.log(yzm1, yzm2, yzm3);
  }

}
const setEmail = async (value) => {
  active.value = value;
  isActive.value = !isActive.value;

  if (yzm1.value === yzm3.value && yzm2.value === yzm4.value) {
    userInfo.value.email = newemail.value;
  }
  else {
    alert("验证码错误");
    console.log(yzm1, yzm2, yzm3);
  }

}

const toggle = async () => {
  isInputDisabled.value = !isInputDisabled.value;
  isActive.value = !isActive.value;

  if (isInputDisabled.value) {

    try {
      // 将 userInfo 中的每个字段保存到 localStorage
      // Object.entries(userInfo.value).forEach(([key, value]) => {
      //   localStorage.setItem(key, value);
      // });


      const data = {
        email: userInfo.value.email,
        phone: userInfo.value.phone,
        username: userInfo.value.username,
        id: localStorage.getItem('id')
      }
      const response = await updateMyMessage(data);
      alert("修改成功");
      console.log(response);
    } catch (error) {

      console.error('信息更新失败', error);
    }
  }

};

const thPassword = async (value) => {
  active.value = value;
  isActive.value = !isActive.value;

  if (newpassword1.value === newpassword2.value) {

    userInfo.value.password = newpassword1.value;
    try {
      const response1 = await updateMyPassword({ id: localStorage.getItem('id'), password: oldpassword.value, newPassword: newpassword1.value });


      const updatedUserInfo = await myMessage({ id: localStorage.getItem('id') });
      if (updatedUserInfo && updatedUserInfo.data) {
        userInfo.value = updatedUserInfo.data;
      }
    } catch (error) {
      alert('信息更新失败', error);

    }
  } else {
    console.log('User Info:', userInfo.value);
    alert(userInfo.value.password);
  }

}


const navigateTo = (path) => {
  router.push(path);
};
function setActive(value) {
  active.value = value;
  isActive.value = !isActive.value;
}




const props = {
  expandTrigger: 'hover',
}

const handleChange = async () => {
  try {
    // 将 userInfo 中的每个字段保存到 localStorage
    // Object.entries(userInfo.value).forEach(([key, value]) => {
    //   localStorage.setItem(key, value);
    // });


    const data = {
      id: null,
      isDefault: 0,
      receiverAddress: xxdz.value,
      receiverCity: selectedOptions.value[1],
      receiverDistrict: selectedOptions.value[2],
      receiverName: shr.value,
      receiverPhone: sjh.value,
      receiverProvince: selectedOptions.value[0],
      userId: 85,


    }
    const response = await addAddress(data);
    alert("修改成功");
    const response1 = await getAddress1({ userId: localStorage.getItem('id') });
    console.log(data);
  } catch (error) {

    console.error('信息更新失败', error);
  }




}


const options = [
  {
    value: '苏州',
    label: '苏州',
    children: [
      {
        value: '昆山',
        label: '昆山',
        children: [
          {
            value: 'A区',
            label: 'Consistency',
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
    value: '杭州',
    label: ' 杭州',
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



</script>

<template>

  <div>

    <div class="background">

      <div class="leftbox" width="100%" height="100%">
        <div class="tx">
          <img class="tx1" :src="tx" length="60%" height="60%" />
          <p class="text1"> 欢迎你</p>


        </div>
        <hr class="hr1">
        <div class="cd" style="font-size: 20px;">
          <div class="cd1">
            <el-icon>
              <User />
            </el-icon>
            <span @click="setActive('first')" :class="{ active: active === 'first' }">个人信息</span>
          </div>
          <div class="cd2">
            <el-icon>
              <Check />
            </el-icon>
            <span @click="navigateTo('/myorder')">我的订单</span>
          </div>

          <div class="cd3">
            <el-icon>
              <ShoppingTrolley />
            </el-icon>

            <span @click="navigateTo('/cart')">购物车</span>
          </div>
          <div class="cd4">
            <el-icon>
              <MapLocation />
            </el-icon>
            <span @click="setActive('second')" :class="{ active: active === 'second' }">地址管理</span>
          </div>
          <div class="mb-4">


          </div>




        </div>



      </div>



      <div class="box" v-if="active === 'second'">
        <table>
          <div class="line1">
            <p>收货人</p>
            <el-input class="a" v-model="shr" style="width: 240px" placeholder="Please input" />
          </div>
          <div class="m-4">
            <p>收货地址</p>
            <el-cascader v-model="selectedOptions" :options="options" @change="handleChange" />
          </div>
          <div class="line3">
            <p>详细地址</p>
            <el-input class="a" v-model="xxdz" style="width: 240px" placeholder="Please input" />
          </div>
          <div class="line4">
            <p>手机号</p>
            <el-input class="a" v-model="sjh" style="width: 240px" placeholder="Please input" />
          </div>
        </table>
        <div class="bt11">
          <el-button @click="handleChange" type="primary">新增地址</el-button>
        </div>
        <el-table :data="userInfo1" style="width: 100%;height: 300px">
          <el-table-column prop="receiverName" label="姓名" width="250" align="center" />
          <el-table-column label="所在地区">
            <el-table-column prop="receiverProvince" label="省" width="70" align="center" />
            <el-table-column prop="receiverCity" label="市" width="70" align="center" />
            <el-table-column prop="receiverDistrict" label="镇" width="70" align="center" />
          </el-table-column>
          <el-table-column prop="receiverAddress" label="详细地址" width="300" align="center" />
          <el-table-column prop="receiverPhone" label="电话/手机" width="150" align="center" />
          <el-table-column prop="data" label="操作" width="150" align="center">
            <template #default="scope">
              <el-button plain size="small" @click="getAdd(scope.row)">
                修改
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.row)">
                删除
              </el-button>


            </template>

          </el-table-column>


          <el-table-column prop="data" label="默认" width="150" align="center">
            <template #default="scope">
              <el-button plain size="small" @click="setMoren(scope.row)" v-if="!scope.row.isDefault">
                设为默认
              </el-button>
              <el-button plain size="small" v-else>
                默认
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <el-dialog v-model="dialogFormVisible" title="修改地址" width="500" center>

        <el-form :model="adderssForm">
          <div class="line1">
            <p>收货人</p>
            <el-input class="a" v-model="adderssForm.receiverName" style="width: 240px" placeholder="地址" />
          </div>
          <div class="m-4">
            <p>收货地址</p>
            <el-cascader v-model="adderssForm.receiverAddressData" :options="options" @change="handleChange" />
          </div>
          <div class="line3">
            <p>详细地址</p>
            <el-input class="a" v-model="adderssForm.receiverAddress" style="width: 240px" placeholder="Please input" />
          </div>
          <div class="line4">
            <p>手机号</p>
            <el-input class="a" v-model="adderssForm.receiverPhone" style="width: 240px" placeholder="Please input" />
          </div>
          <!-- <el-form-item label="" :label-width="formLabelWidth">

      </el-form-item> -->


          <el-form-item :label-width="formLabelWidth">

            <div class="mb-4" style="display:flex;justify-content:flex-end;margin-left: 20px;">
              <el-button @click="dialogFormVisible = false">
                取消
              </el-button>
              <el-button @click="handleUpdate">
                确认
              </el-button>
            </div>
          </el-form-item>

        </el-form>


      </el-dialog>
      <div class="box1" v-if="active === 'first'">
        <div class="boxspan">
          <span>基本信息</span>
        </div>
        <hr class="hr2">
        <div class="t1">
          <p>账号&nbsp;&nbsp;&nbsp;&nbsp;{{ userInfo.userAccount }} </p>

        </div>
        <div class="t2">
          <p class="b">用户名 </p>
          <el-input class="a" v-model="userInfo.username" style="width: 240px" :disabled="isInputDisabled"
            placeholder="Please input" />
        </div>
        <div class="t3">
          <p>手机号&nbsp;&nbsp;&nbsp;&nbsp;{{ userInfo.phone }} </p>
          <el-button @click="setActive('third')" :class="{ active: active === 'third' }" class="bt3"
            v-if="!isActive">修改手机号</el-button>

        </div>
        <div class="t4">
          <p>邮箱&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ userInfo.email }} </p>
          <el-button class="bt4" @click="setActive('fourth')" :class="{ active: active === 'fourth' }"
            v-if="!isActive">修改邮箱</el-button>
        </div>
        <div>
          <!-- 两个按钮一个取消一个修改密码，一次性只存在一个 -->
          <el-button class="bt1" @click="toggle" :class="{ 'active': isActive }">
            {{ isActive ? '编辑信息' : '确认' }}</el-button>
          <el-button class="bt2" @click="setActive('fifth')" :class="{ active: active === 'fifth' }" v-if="isActive">
            {{ isActive ? '修改密码' : '取消' }}</el-button>
          <el-button class="bt2" @click="toggle" :class="{ 'active': isActive }" v-if="!isActive">
            {{ '取消' }}</el-button>
        </div>
      </div>

      <div class="box3" v-if="active === 'third'">


        <div class="boxspan">
          <span>修改手机号</span>
        </div>
        <hr class="hr2">
        <p class="pt1"> 原手机号</p>
        <el-input class="pb1" v-model="userInfo.phone" style="width: 240px" placeholder="Please input" />
        <p class="pt1"> 验证码</p><el-button class="bt5" :plain="true" @click="setYzm1">验证码</el-button>
        <el-input class="pb1" v-model="yzm3" style="width: 140px" placeholder="验证码1" />
        <p class="pt1"> 改后手机号</p>
        <el-input class="pb1" v-model="newphone" style="width: 240px" placeholder="Please input" />
        <p class="pt1"> 改后验证码</p><el-button class="bt5" :plain="true" @click="setYzm2">验证码</el-button>
        <el-input class="pb1" v-model="yzm4" style="width: 140px" placeholder="验证码2" />
        <div>
          <el-button class="bt1" @click="setPhone('first')" :class="{ active: active === 'first' }">
            确认</el-button>
          <el-button class="bt2" @click="setActive('first')" :class="{ active: active === 'first' }">
            取消</el-button>
        </div>









      </div>
      <div class="box4" v-if="active === 'fourth'">
        <div class="boxspan">
          <span>修改邮箱</span>
        </div>
        <hr class="hr2">
        <p class="pt1"> 原邮箱</p>
        <el-input class="pb1" v-model="userInfo.email" style="width: 240px" placeholder="Please input" />

        <p class="pt1"> 验证码</p><el-button class="bt5" :plain="true" @click="setYzm1">验证码</el-button>
        <el-input class="pb1" v-model="yzm3" style="width: 240px" placeholder="Please input" />
        <p class="pt1"> 新邮箱</p>
        <el-input class="pb1" v-model="newemail" style="width: 240px" placeholder="Please input" />
        <p class="pt1"> 验证码</p><el-button class="bt5" :plain="true" @click="setYzm2">验证码</el-button>
        <el-input class="pb1" v-model="yzm4" style="width: 240px" placeholder="Please input" />
        <div>
          <el-button class="bt1" @click="setEmail('first')" :class="{ active: active === 'first' }">
            确认</el-button>
          <el-button class="bt2" @click="setActive('first')" :class="{ active: active === 'first' }">
            取消</el-button>
        </div>

      </div>
      <div class="box5" v-if="active === 'fifth'">
        <div class="boxspan">
          <span>修改密码</span>
        </div>
        <hr class="hr2">
        <form class="psbox">
          <p>原密码</p>
          <el-input v-model="oldpassword" style="width: 400px" placeholder="Please input" />
          <p>新密码</p>
          <el-input v-model="newpassword1" style="width: 400px" placeholder="Please input" />
          <p>确认密码</p>
          <el-input v-model="newpassword2" style="width: 400px" placeholder="Please input" />

        </form>

        <el-button class="sbt1" @click="thPassword('first')" :class="{ active: active === 'first' }">
          确认</el-button>
        <el-button class="sbt2" @click="thPassword('first')" :class="{ active: active === 'first' }">
          取消</el-button>
        <el-link class="wjmm" href="/forgetpwd" target="_blank">忘记密码</el-link>

      </div>
    </div>
  </div>

</template>



<style scoped>
.pt1,
.pb1 {
  margin-left: 200px;

}

.y1,
.yt1 {
  margin-left: 200px;

  margin-top: 10px;
}

.bt11 {
  margin-left: 20px;
  margin-top: 20px;
}

.bt1,
.bt2 {

  float: left;
  width: 100px;
  height: 40px;
  margin-left: 180px;
  margin-top: 10px;
}

.bt1 {
  margin-right: 100px;


  align-items: center;
  margin-bottom: 10px;
  /* 调整行间距 */
}

.sbt1 {
  float: left;
  width: 60px;
  height: 30px;
  margin-top: 30px;
  margin-left: 200px;

}

.sbt2 {
  float: left;
  width: 60px;
  height: 30px;
  margin-left: 200px;
  /* 调整左边距 */
  margin-top: 30px;

}

.bt3,
.bt4 {
  float: right;
  width: 100px;
  height: 40px;
  margin-right: 100px;
  margin-top: -40px;
}

.bt5 {
  float: right;
  margin-right: 250px;
}

.a,
.b {
  display: inline-block;
}

.boxspan {
  display: flex;
  /* justify-content: flex-start;  */
  font-size: 18px;
  align-items: center;
  margin-bottom: 10px;
  /* 调整行间距 */
  color: rgba(67, 66, 66, 0.82);
  padding-left: 30px;
  margin-top: 40px;


}

.hr2 {
  border: none;
  border-top: 1px solid #ccc;
  width: 90%;
  margin: 0 auto;

}


.cd1,
.cd2,
.cd3,
.cd4 {

  display: flex;
}

.cd {
  display: grid;
  margin-left: 30%;
  margin-top: 30px;
  row-gap: 20px;


}

.hr1 {
  border: none;
  border-top: 1px solid #ccc;
  width: 60%;
  margin: 0 auto;
}

.t1,
.t2,
.t3,
.t4 {
  font-size: 15px;

  margin-left: 200px;
  margin-top: 50px;
}

.text1 {
  font-size: 24px;
  color: rgb(0, 0, 0);
  text-align: center;
}

.tx {

  width: 100%;
  /* 你可以根据需要调整宽度 */
  height: 40%;
  /* 你可以根据需要调整高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

}

.leftbox {
  border-radius: 10px;
  width: 25%;
  height: 70%;
  /* position: absolute; */
  /* top: 20%;

  left: 2%; */
  background-color: rgb(253, 251, 251);
  /* 背景颜色 */
  margin-left: 30px;
}

.psbox {
  display: flex;
  flex-direction: column;
  margin-left: 200px;
  margin-top: 50px;
}

.box,
.box1,
.box3,
.box4,
.box5 {
  display: inline-block;
  border-radius: 10px;
  width: 70%;
  height: 60%;
  /* position: absolute; */

  /* 距离顶部 20% 的距离 */
  margin-left: 40px;
  margin-top: 0%;
  /*  ;
width: 100%;
padding: 20px; 可选：增加一些内边距
  box-sizing: border-box;
  /* 确保 padding 不会影响宽度 */

  /* 背景颜色 */
  background-color: rgb(253, 251, 251);

}

.wjmm {
  margin-left: 200px;
  margin-top: 20px;
}

.line1,
.m-4,
.line3,
.line4 {
  display: flex;
  /* justify-content: flex-start;  */
  padding-left: 20px;
  align-items: center;
  margin-bottom: 10px;
  /* 调整行间距 */

}

p {
  margin-right: 10px;
  /* 调整文字和输入框之间的间距 */
  color: rgb(0, 0, 0);
}

.background {
  width: 100%;
  height: 200vh;
  background-image: url('../assets/bg011.png');
  background-size: cover;
  /* background-position: center; */
  /* flex-direction: row; */
  display: flex;
  align-items: center;
}
</style>
