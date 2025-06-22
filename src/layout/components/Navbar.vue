<template>
  <div class="navbar">
    <div class="navbar-left">
      <!-- 侧边栏折叠按钮 -->
      <div class="hamburger-container" @click="toggleSideBar">
        <svg-icon 
          :icon-class="sidebar.opened ? 'hamburger-opened' : 'hamburger'" 
          class="hamburger"
        />
      </div>
      
      <!-- 面包屑导航 -->
      <breadcrumb class="breadcrumb-container" />
    </div>
    
    <div class="navbar-right">
      <!-- 全屏按钮 -->
      <div class="right-menu-item" @click="toggleFullscreen">
        <svg-icon :icon-class="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
      </div>
      
      <!-- 国际化 -->
      <div class="right-menu-item" @click="toggleLanguage">
        <svg-icon icon-class="language" />
      </div>
      
      <!-- 用户头像下拉菜单 -->
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :size="32" :src="userInfo.avatar">
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          </el-avatar>
          <span class="user-name">{{ userInfo.name }}</span>
          <el-icon><arrow-down /></el-icon>
        </div>
        
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/system/profile">
              <el-dropdown-item>
                <svg-icon icon-class="user" />
                <span>个人中心</span>
              </el-dropdown-item>
            </router-link>
            
            <el-dropdown-item divided @click="handleLogout">
              <svg-icon icon-class="logout" />
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

export default {
  name: 'Navbar',
  components: {
    Breadcrumb,
    SvgIcon
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const sidebar = computed(() => store.state.app.sidebar)
    const userInfo = computed(() => store.state.user.userInfo)
    const isFullscreen = ref(false)
    
    // 切换侧边栏
    const toggleSideBar = () => {
      store.dispatch('app/toggleSideBar')
    }
    
    // 切换全屏
    const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
        isFullscreen.value = true
      } else {
        document.exitFullscreen()
        isFullscreen.value = false
      }
    }
    
    // 切换语言
    const toggleLanguage = () => {
      // 实现语言切换逻辑
      console.log('切换语言')
    }
    
    // 退出登录
    const handleLogout = () => {
      ElMessageBox.confirm(
        '确定要退出登录吗？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(async () => {
        await store.dispatch('user/logout')
        router.push('/login')
      }).catch(() => {
        // 取消退出
      })
    }
    
    return {
      sidebar,
      userInfo,
      isFullscreen,
      toggleSideBar,
      toggleFullscreen,
      toggleLanguage,
      handleLogout
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: $--header-height;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  
  .navbar-left {
    display: flex;
    align-items: center;
    
    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;
      
      &:hover {
        background: rgba(0, 0, 0, .025);
      }
      
      .hamburger {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
    
    .breadcrumb-container {
      float: left;
      margin-left: 20px;
    }
  }
  
  .navbar-right {
    display: flex;
    align-items: center;
    
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      cursor: pointer;
      
      &:hover {
        background: rgba(0, 0, 0, .025);
      }
    }
    
    .avatar-container {
      margin-left: 10px;
      
      .avatar-wrapper {
        display: flex;
        align-items: center;
        cursor: pointer;
        
        .user-name {
          margin: 0 8px;
          font-size: 14px;
          color: #606266;
        }
      }
    }
  }
}

// 移动端适配
@media (max-width: 768px) {
  .navbar {
    padding: 0 10px;
    
    .navbar-left {
      .breadcrumb-container {
        display: none;
      }
    }
    
    .navbar-right {
      .right-menu-item {
        padding: 0 4px;
        font-size: 16px;
      }
      
      .avatar-container {
        .avatar-wrapper {
          .user-name {
            display: none;
          }
        }
      }
    }
  }
}
</style> 