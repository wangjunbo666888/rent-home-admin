<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { computed } from 'vue'
import { isExternal } from '@/utils/validate'

export default {
  name: 'AppLink',
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const type = computed(() => {
      if (isExternal(props.to)) {
        return 'a'
      }
      return 'router-link'
    })
    
    const linkProps = (to) => {
      if (isExternal(to)) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    }
    
    return {
      type,
      linkProps
    }
  }
}
</script> 