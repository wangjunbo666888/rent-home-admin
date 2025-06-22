import { login, logout, getUserInfo } from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  userInfo: null,
  roles: [],
  permissions: []
}

const mutations = {
  // 设置token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 设置用户信息
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  // 设置角色
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  // 设置权限
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
  // 清除用户信息
  CLEAR_USER_INFO: (state) => {
    state.token = null
    state.userInfo = null
    state.roles = []
    state.permissions = []
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 获取用户信息
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo(state.token)
        .then(response => {
          const { data } = response
          
          if (!data) {
            reject('验证失败，请重新登录。')
          }

          const { roles, permissions, ...userInfo } = data

          // 角色必须是非空数组
          if (!roles || roles.length <= 0) {
            reject('getUserInfo: 角色必须是非空数组!')
          }

          commit('SET_ROLES', roles)
          commit('SET_PERMISSIONS', permissions)
          commit('SET_USER_INFO', userInfo)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 用户登出
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        // 删除路由重置，因为resetRouter未定义
        // resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 重置token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('CLEAR_USER_INFO')
      removeToken()
      resolve()
    })
  },

  // 动态修改权限
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getUserInfo')

      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      resolve(accessRoutes)
    })
  }
}

const getters = {
  // 获取token
  token: state => state.token,
  // 获取用户信息
  userInfo: state => state.userInfo,
  // 获取角色
  roles: state => state.roles,
  // 获取权限
  permissions: state => state.permissions,
  // 是否已登录
  isLoggedIn: state => !!state.token,
  // 是否是管理员
  isAdmin: state => state.roles.includes('admin'),
  // 是否有权限
  hasPermission: (state) => (permission) => {
    return state.permissions.includes(permission)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 