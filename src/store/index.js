import { createStore } from 'vuex'
import user from './modules/user'
import app from './modules/app'
import permission from './modules/permission'

export default createStore({
  modules: {
    user,
    app,
    permission
  },
  
  // 全局状态
  state: {
    // 全局加载状态
    loading: false,
    // 全局错误信息
    error: null
  },
  
  mutations: {
    // 设置加载状态
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    // 设置错误信息
    SET_ERROR(state, error) {
      state.error = error
    },
    // 清除错误信息
    CLEAR_ERROR(state) {
      state.error = null
    }
  },
  
  actions: {
    // 显示加载
    showLoading({ commit }) {
      commit('SET_LOADING', true)
    },
    // 隐藏加载
    hideLoading({ commit }) {
      commit('SET_LOADING', false)
    },
    // 设置错误
    setError({ commit }, error) {
      commit('SET_ERROR', error)
    },
    // 清除错误
    clearError({ commit }) {
      commit('CLEAR_ERROR')
    }
  },
  
  getters: {
    // 获取加载状态
    loading: state => state.loading,
    // 获取错误信息
    error: state => state.error
  }
}) 