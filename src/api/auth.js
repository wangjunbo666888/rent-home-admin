import request from '@/utils/request'

/**
 * 用户登录
 * @param {object} data - 登录信息
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 */
export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

/**
 * 用户登出
 */
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request({
    url: '/auth/profile',
    method: 'get'
  })
}

/**
 * 刷新token
 */
export function refreshToken() {
  return request({
    url: '/auth/refresh',
    method: 'post'
  })
}

/**
 * 修改密码
 * @param {object} data - 密码信息
 * @param {string} data.oldPassword - 旧密码
 * @param {string} data.newPassword - 新密码
 */
export function changePassword(data) {
  return request({
    url: '/auth/change-password',
    method: 'post',
    data
  })
}

/**
 * 忘记密码
 * @param {object} data - 重置密码信息
 * @param {string} data.email - 邮箱
 */
export function forgotPassword(data) {
  return request({
    url: '/auth/forgot-password',
    method: 'post',
    data
  })
}

/**
 * 重置密码
 * @param {object} data - 重置密码信息
 * @param {string} data.token - 重置token
 * @param {string} data.newPassword - 新密码
 */
export function resetPassword(data) {
  return request({
    url: '/auth/reset-password',
    method: 'post',
    data
  })
} 