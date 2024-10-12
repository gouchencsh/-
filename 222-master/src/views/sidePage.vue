<template>
  <div class="sidebar">
    <!-- 标题:平台管理中心 -->
    <div class="sidebar-title">
      平台管理中心
    </div>

    <!-- 导航菜单 -->
    <el-menu default-active="-1" class="el-menu-vertical-demo" background-color="black" text-color="#fff"
      active-text-color="#ffd04b">
      <router-link to="/usermanager" class="no-link-styles">
        <el-menu-item index="1">
          <i class="el-icon-user"></i>
          <el-icon>
            <User />
          </el-icon>
          <span>用户管理</span>
        </el-menu-item>
      </router-link>

      <router-link to="/order" class="no-link-styles">
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <el-icon>
            <Document />
          </el-icon>
          <span>订单管理</span>
        </el-menu-item>
      </router-link>

      <router-link to="/goods" class="no-link-styles">
        <el-menu-item index="3">
          <i class="el-icon-house"></i>
          <el-icon>
            <House />
          </el-icon>
          <span>商品管理</span>
        </el-menu-item>
      </router-link>

      <router-link to="/goodstypes" class="no-link-styles">
        <el-menu-item index="4">
          <i class="el-icon-settting"></i>
          <el-icon>
            <Setting />
          </el-icon>
          <span>商品分类</span>
        </el-menu-item>
      </router-link>

    </el-menu>
  </div>
</template>


<style>
.sidebar {
  width: 253px;
  height: 100vh;
  background-color: #000000;
  color: #fff;
}

.sidebar-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 20px 0;
  color: #fff;
}

.el-menu-vertical-demo {
  width: 100%;
}

.no-link-styles {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
</style>


<script setup>
import { User, Document, House, Setting } from '@element-plus/icons-vue';
</script>