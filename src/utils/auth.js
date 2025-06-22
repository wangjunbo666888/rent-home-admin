const TokenKey = 'Admin-Token'

/**
 * 获取token
 */
export function getToken() {
  return localStorage.getItem(TokenKey)
}

/**
 * 设置token
 * @param {string} token
 */
export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

/**
 * 移除token
 */
export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  const userInfo = localStorage.getItem('userInfo')
  return userInfo ? JSON.parse(userInfo) : null
}

/**
 * 设置用户信息
 * @param {object} userInfo
 */
export function setUserInfo(userInfo) {
  return localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

/**
 * 移除用户信息
 */
export function removeUserInfo() {
  return localStorage.removeItem('userInfo')
}

/**
 * 清除所有认证信息
 */
export function clearAuth() {
  removeToken()
  removeUserInfo()
  localStorage.removeItem('sidebarStatus')
}

/**
 * 检查是否已登录
 */
export function isLoggedIn() {
  return !!getToken()
}

/**
 * 检查token是否过期
 * @param {string} token
 */
export function isTokenExpired(token) {
  if (!token) return true
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Date.now() / 1000
    
    return payload.exp < currentTime
  } catch (error) {
    return true
  }
} 