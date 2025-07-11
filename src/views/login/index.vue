<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">房产中介管理系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <el-icon><User /></el-icon>
        </span>
        <el-input
          ref="usernameRef"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <el-icon><Lock /></el-icon>
        </span>
        <el-input
          :key="passwordType"
          ref="passwordRef"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          autocomplete="on"
          @keyup.enter="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <el-icon>
            <ViewIcon v-if="passwordType === 'password'" />
            <Hide v-else />
          </el-icon>
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.prevent="handleLogin"
      >
        登录
      </el-button>

      <div style="position: relative">
        <div class="tips">
          <span>用户名: admin</span>
          <span>密码: 123456</span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { ref, reactive, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock, View as ViewIcon, Hide } from '@element-plus/icons-vue'

export default {
  name: 'Login',
  components: {
    User,
    Lock,
    ViewIcon,
    Hide
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    
    const loginFormRef = ref(null)
    const usernameRef = ref(null)
    const passwordRef = ref(null)
    const loading = ref(false)
    const passwordType = ref('password')
    
    const loginForm = reactive({
      username: 'admin',
      password: '123456'
    })
    
    const loginRules = {
      username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
      password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
    }
    
    const showPwd = () => {
      if (passwordType.value === 'password') {
        passwordType.value = ''
      } else {
        passwordType.value = 'password'
      }
      nextTick(() => {
        passwordRef.value.focus()
      })
    }
    
    const handleLogin = () => {
      loginFormRef.value.validate(async valid => {
        if (valid) {
          loading.value = true
          try {
            await store.dispatch('user/login', loginForm)
            await store.dispatch('user/getUserInfo')
            
            // 获取重定向地址，如果没有则跳转到首页
            const redirect = route.query.redirect || '/'
            router.push(redirect)
            ElMessage.success('登录成功')
          } catch (error) {
            console.log('登录失败:', error)
            ElMessage.error(error.message || '登录失败')
          } finally {
            loading.value = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    
    return {
      loginFormRef,
      usernameRef,
      passwordRef,
      loading,
      passwordType,
      loginForm,
      loginRules,
      showPwd,
      handleLogin
    }
  }
}
</script>

<style lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style> 