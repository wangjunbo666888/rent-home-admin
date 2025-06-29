import router from './router'
import store from './store'
import { getToken } from '@/utils/auth'
import { ElMessage } from 'element-plus'

// 白名单路由
const whiteList = ['/login', '/404']

/**
 * 路由守卫
 */
router.beforeEach(async (to, from, next) => {
  // 开始进度条
  // NProgress.start()

  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 房产中介管理系统` : '房产中介管理系统'

  const hasToken = getToken()
  
  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，重定向到首页
      next({ path: '/' })
      // NProgress.done()
    } else {
      // 检查用户信息是否存在
      const hasUserInfo = store.getters['user/userInfo']
      
      if (hasUserInfo) {
        // 检查路由权限
        if (to.meta && to.meta.roles) {
          const userRoles = store.getters['user/roles']
          const hasPermission = to.meta.roles.some(role => userRoles.includes(role))
          
          if (hasPermission) {
            next()
          } else {
            ElMessage.error('没有访问权限')
            next('/404')
          }
        } else {
          next()
        }
      } else {
        try {
          // 获取用户信息
          await store.dispatch('user/getUserInfo')
          next({ ...to, replace: true })
        } catch (error) {
          // 获取用户信息失败，清除token并跳转登录页
          await store.dispatch('user/resetToken')
          ElMessage.error(error.message || '获取用户信息失败，请重新登录')
          next(`/login?redirect=${to.path}`)
          // NProgress.done()
        }
      }
    }
  } else {
    /* 没有token */

    if (whiteList.includes(to.path)) {
      // 在免登录白名单中，直接进入
      next()
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面
      next(`/login?redirect=${to.path}`)
      // NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完成进度条
  // NProgress.done()
}) 