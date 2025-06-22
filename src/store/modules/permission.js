/**
 * 使用meta.role判断当前用户是否有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = routes
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // 简化权限控制，所有角色都可以访问所有路由
      const accessedRoutes = []
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

const getters = {
  // 获取所有路由
  routes: state => state.routes,
  // 获取动态添加的路由
  addRoutes: state => state.addRoutes
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 