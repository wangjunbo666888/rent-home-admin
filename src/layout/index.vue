<template>
  <div class="app-wrapper" :class="{ collapsed: !sidebar.opened }">
    <!-- 侧边栏 -->
    <sidebar class="sidebar-container" />
    
    <!-- 主容器 -->
    <div class="main-container">
      <!-- 头部 -->
      <navbar />
      
      <!-- 标签栏 -->
      <tags-view v-if="needTagsView" />
      
      <!-- 主内容区 -->
      <app-main />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import TagsView from './components/TagsView/index.vue'
import AppMain from './components/AppMain.vue'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    TagsView,
    AppMain
  },
  setup() {
    const store = useStore()
    
    const sidebar = computed(() => store.state.app.sidebar)
    const needTagsView = computed(() => store.state.settings.tagsView)
    
    return {
      sidebar,
      needTagsView
    }
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  
  &.collapsed {
    .sidebar-container {
      width: $--sidebar-collapse-width !important;
    }
    
    .main-container {
      margin-left: $--sidebar-collapse-width;
    }
  }
}

.sidebar-container {
  transition: width 0.28s;
  width: $--sidebar-width !important;
  background-color: #304156;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.main-container {
  min-height: 100%;
  transition: margin-left .28s;
  margin-left: $--sidebar-width;
  position: relative;
}

// 移动端适配
@media (max-width: 768px) {
  .sidebar-container {
    width: 0 !important;
  }
  
  .main-container {
    margin-left: 0 !important;
  }
  
  .app-wrapper.collapsed {
    .sidebar-container {
      width: 0 !important;
    }
    
    .main-container {
      margin-left: 0 !important;
    }
  }
}
</style> 