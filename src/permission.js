import router from './router'
import store from './store'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth'

// 白名单路由
const whiteList = ['/login', '/404']

/**
 * 路由守卫
 */
router.beforeEach(async(to, from, next) => {
  // 开始进度条
  // NProgress.start()

  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 房产中介管理系统` : '房产中介管理系统'

  // 获取token
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，重定向到首页
      next({ path: '/' })
      // NProgress.done()
    } else {
      // 确定用户是否已通过getUserInfo获得其权限角色
      const hasRoles = store.getters['user/roles'] && store.getters['user/roles'].length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息
          const { roles } = await store.dispatch('user/getUserInfo')

          // 基于角色生成可访问的路由映射
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 动态添加可访问路由
          accessRoutes.forEach(route => {
            router.addRoute(route)
          })

          // 确保addRoutes已完成
          // 设置replace: true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 移除token并跳转登录页面重新登录
          await store.dispatch('user/resetToken')
          ElMessage.error(error || '出现错误，请重新登录')
          next(`/login?redirect=${to.path}`)
          // NProgress.done()
        }
      }
    }
  } else {
    /* 没有token */

    if (whiteList.indexOf(to.path) !== -1) {
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