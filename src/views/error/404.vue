<template>
  <div class="error-page">
    <div class="error-code">404</div>
    <div class="error-desc">抱歉，你访问的页面不存在</div>
    <div class="error-handle">
      <el-button type="primary" @click="goHome">返回首页</el-button>
      <el-button @click="goBack">返回上一页</el-button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'Page404',
  setup() {
    const router = useRouter()
    
    const goHome = () => {
      router.push('/')
    }
    
    const goBack = () => {
      router.go(-1)
    }
    
    return {
      goHome,
      goBack
    }
  }
}
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f0f2f5;
  
  .error-code {
    font-size: 120px;
    font-weight: bold;
    color: #409eff;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .error-desc {
    font-size: 24px;
    color: #606266;
    margin-bottom: 40px;
  }
  
  .error-handle {
    .el-button {
      margin: 0 10px;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .error-page {
    padding: 20px;
    
    .error-code {
      font-size: 80px;
    }
    
    .error-desc {
      font-size: 18px;
      text-align: center;
    }
    
    .error-handle {
      .el-button {
        margin: 5px;
      }
    }
  }
}
</style> 