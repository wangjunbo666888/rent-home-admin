<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path, onlyOneChild.query)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown': !isNest}">
          <svg-icon :icon-class="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" />
          <template #title>
            <span>{{ onlyOneChild.meta.title }}</span>
          </template>
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <svg-icon :icon-class="item.meta && item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script>
import { ref } from 'vue'
import { isExternal } from '@/utils/validate'
import AppLink from './Link.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

export default {
  name: 'SidebarItem',
  components: {
    AppLink,
    SvgIcon
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const onlyOneChild = ref(null)
    
    const hasOneShowingChild = (children = [], parent) => {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          onlyOneChild.value = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    }
    
    const resolvePath = (routePath, routeQuery) => {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(props.basePath)) {
        return props.basePath
      }
      if (routeQuery) {
        let query = JSON.parse(JSON.stringify(routeQuery))
        return { path: routePath, query }
      }
      return routePath
    }
    
    return {
      onlyOneChild,
      hasOneShowingChild,
      resolvePath
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-item {
  height: 50px;
  line-height: 50px;
  
  .svg-icon {
    margin-right: 16px;
  }
}

.el-sub-menu {
  .el-sub-menu__title {
    height: 50px;
    line-height: 50px;
    
    .svg-icon {
      margin-right: 16px;
    }
  }
  
  .nest-menu {
    .el-menu-item {
      height: 50px;
      line-height: 50px;
      padding-left: 50px !important;
      
      .svg-icon {
        margin-right: 16px;
      }
    }
  }
}
</style> 