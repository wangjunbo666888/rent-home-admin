<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ScrollPane',
  setup() {
    const scrollContainer = ref(null)
    
    const handleScroll = (e) => {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = scrollContainer.value.$refs.wrap
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
    }
    
    const moveToTarget = (currentTag) => {
      const $container = scrollContainer.value.$el.querySelector('.scrollbar-wrapper')
      const $containerWidth = $container.offsetWidth
      const $scrollWrapper = scrollContainer.value.$refs.wrap
      const tagList = this.$parent.$refs.tag
      let firstTag = null
      let lastTag = null

      // find first and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }

      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex(item => item === currentTag)
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + 4

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - 4

        if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
        }
      }
    }
    
    return {
      scrollContainer,
      handleScroll,
      moveToTarget
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  
  ::v-deep(.el-scrollbar__bar) {
    bottom: 0px;
  }
  
  ::v-deep(.el-scrollbar__wrap) {
    height: 49px;
  }
}
</style> 