const state = {
  // 侧边栏状态
  sidebar: {
    opened: localStorage.getItem('sidebarStatus') ? !!+localStorage.getItem('sidebarStatus') : true,
    withoutAnimation: false
  },
  // 设备类型
  device: 'desktop',
  // 主题色
  theme: localStorage.getItem('theme') || '#409EFF',
  // 语言
  language: localStorage.getItem('language') || 'zh-CN',
  // 页面大小
  size: localStorage.getItem('size') || 'default',
  // 全屏状态
  fullscreen: false
}

const mutations = {
  // 切换侧边栏
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      localStorage.setItem('sidebarStatus', 1)
    } else {
      localStorage.setItem('sidebarStatus', 0)
    }
  },
  // 关闭侧边栏
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    localStorage.setItem('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  // 切换设备
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  // 设置主题色
  SET_THEME: (state, theme) => {
    state.theme = theme
    localStorage.setItem('theme', theme)
  },
  // 设置语言
  SET_LANGUAGE: (state, language) => {
    state.language = language
    localStorage.setItem('language', language)
  },
  // 设置页面大小
  SET_SIZE: (state, size) => {
    state.size = size
    localStorage.setItem('size', size)
  },
  // 切换全屏
  TOGGLE_FULLSCREEN: (state, fullscreen) => {
    state.fullscreen = fullscreen
  }
}

const actions = {
  // 切换侧边栏
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  // 关闭侧边栏
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  // 切换设备
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  // 设置主题色
  setTheme({ commit }, theme) {
    commit('SET_THEME', theme)
  },
  // 设置语言
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  // 设置页面大小
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  // 切换全屏
  toggleFullscreen({ commit }, fullscreen) {
    commit('TOGGLE_FULLSCREEN', fullscreen)
  }
}

const getters = {
  // 获取侧边栏状态
  sidebar: state => state.sidebar,
  // 获取设备类型
  device: state => state.device,
  // 获取主题色
  theme: state => state.theme,
  // 获取语言
  language: state => state.language,
  // 获取页面大小
  size: state => state.size,
  // 获取全屏状态
  fullscreen: state => state.fullscreen
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 