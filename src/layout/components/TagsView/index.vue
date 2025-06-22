<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPaneRef" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        class="tags-view-item"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新页面</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭当前</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import ScrollPane from './ScrollPane.vue'

export default {
  name: 'TagsView',
  components: {
    ScrollPane
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    
    const scrollPaneRef = ref(null)
    const visible = ref(false)
    const top = ref(0)
    const left = ref(0)
    const selectedTag = ref({})
    
    const visitedViews = computed(() => store.state.tagsView.visitedViews)
    const cachedViews = computed(() => store.state.tagsView.cachedViews)
    
    const isActive = (tag) => {
      return tag.path === route.path
    }
    
    const isAffix = (tag) => {
      return tag.meta && tag.meta.affix
    }
    
    const addTags = () => {
      const { name } = route
      if (name) {
        store.dispatch('tagsView/addView', route)
      }
      return false
    }
    
    const closeSelectedTag = async (view) => {
      await store.dispatch('tagsView/delView', view)
      if (isActive(view)) {
        toLastView()
      }
    }
    
    const toLastView = () => {
      const latestView = visitedViews.value.slice(-1)[0]
      if (latestView) {
        router.push(latestView.fullPath)
      } else {
        // 现在默认重定向到首页
        if (route.name === 'Dashboard') {
          // 重新加载仪表板
          router.replace({ path: '/redirect' + route.fullPath })
        } else {
          router.push('/')
        }
      }
    }
    
    const openMenu = (tag, e) => {
      const menuMinWidth = 105
      const offsetLeft = e.clientX
      const offsetWidth = scrollPaneRef.value.$el.offsetWidth
      const maxLeft = offsetWidth - menuMinWidth
      const left = offsetLeft > maxLeft ? maxLeft : offsetLeft
      
      top.value = e.clientY
      left.value = left
      visible.value = true
      selectedTag.value = tag
    }
    
    const closeMenu = () => {
      visible.value = false
    }
    
    const refreshSelectedTag = (view) => {
      store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view
        nextTick(() => {
          router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    }
    
    const closeOthersTags = async () => {
      await router.push(selectedTag.value)
      await store.dispatch('tagsView/delOthersViews', selectedTag.value)
    }
    
    const closeAllTags = async (view) => {
      await store.dispatch('tagsView/delAllViews')
      if (view.meta.affix) {
        return
      }
      toLastView()
    }
    
    // 监听路由变化
    watch(route, () => {
      addTags()
    })
    
    // 监听点击事件
    const handleClick = () => {
      closeMenu()
    }
    
    onMounted(() => {
      addTags()
      document.addEventListener('click', handleClick)
    })
    
    onUnmounted(() => {
      document.removeEventListener('click', handleClick)
    })
    
    return {
      scrollPaneRef,
      visible,
      top,
      left,
      selectedTag,
      visitedViews,
      cachedViews,
      isActive,
      isAffix,
      closeSelectedTag,
      openMenu,
      closeMenu,
      refreshSelectedTag,
      closeOthersTags,
      closeAllTags
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495057;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      text-decoration: none;
      
      &:first-of-type {
        margin-left: 15px;
      }
      
      &:last-of-type {
        margin-right: 15px;
      }
      
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
      
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;
        
        &:before {
          transform: scale(.6);
          display: inline-block;
          vertical-align: -3px;
        }
        
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
  
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      
      &:hover {
        background: #eee;
      }
    }
  }
}
</style> 