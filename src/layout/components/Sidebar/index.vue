<template>
  <div class="sidebar-container">
    <!-- Logo -->
    <div class="sidebar-logo-container">
      <router-link to="/" class="sidebar-logo-link">
        <img src="@/assets/logo.png" class="sidebar-logo" alt="Logo">
        <h1 class="sidebar-title" v-if="sidebar.opened">房产中介管理系统</h1>
      </router-link>
    </div>
    
    <!-- 菜单 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="!sidebar.opened"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import SidebarItem from './SidebarItem.vue'

export default {
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    
    const sidebar = computed(() => store.state.app.sidebar)
    const routes = computed(() => store.state.permission.routes)
    
    // 当前激活的菜单
    const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    
    // 样式变量
    const variables = {
      menuBg: '#304156',
      menuText: '#bfcbd9',
      menuActiveText: '#409EFF'
    }
    
    return {
      sidebar,
      routes,
      activeMenu,
      variables
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  .sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #2b2f3a;
    text-align: center;
    overflow: hidden;
    
    .sidebar-logo-link {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .sidebar-logo {
        width: 32px;
        height: 32px;
        vertical-align: middle;
        margin-right: 12px;
      }
      
      .sidebar-title {
        display: inline-block;
        margin: 0;
        color: #fff;
        font-weight: 600;
        line-height: 50px;
        font-size: 14px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      }
    }
    
    &.collapse {
      .sidebar-logo {
        margin-right: 0px;
      }
    }
  }
  
  .el-scrollbar {
    height: calc(100% - 50px);
  }
  
  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
  }
}
</style> 