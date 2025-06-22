import request from '@/utils/request'

/**
 * 获取用户列表
 * @param {object} params - 查询参数
 * @param {number} params.page - 页码
 * @param {number} params.limit - 每页数量
 * @param {string} params.keyword - 搜索关键词
 * @param {string} params.role - 角色筛选
 * @param {string} params.status - 状态筛选
 */
export function getUserList(params) {
  return request({
    url: '/users',
    method: 'get',
    params
  })
}

/**
 * 获取用户详情
 * @param {number} id - 用户ID
 */
export function getUserDetail(id) {
  return request({
    url: `/users/${id}`,
    method: 'get'
  })
}

/**
 * 创建用户
 * @param {object} data - 用户信息
 */
export function createUser(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

/**
 * 更新用户
 * @param {number} id - 用户ID
 * @param {object} data - 用户信息
 */
export function updateUser(id, data) {
  return request({
    url: `/users/${id}`,
    method: 'put',
    data
  })
}

/**
 * 删除用户
 * @param {number} id - 用户ID
 */
export function deleteUser(id) {
  return request({
    url: `/users/${id}`,
    method: 'delete'
  })
}

/**
 * 批量删除用户
 * @param {array} ids - 用户ID数组
 */
export function batchDeleteUsers(ids) {
  return request({
    url: '/users/batch-delete',
    method: 'post',
    data: { ids }
  })
}

/**
 * 更新用户状态
 * @param {number} id - 用户ID
 * @param {string} status - 状态
 */
export function updateUserStatus(id, status) {
  return request({
    url: `/users/${id}/status`,
    method: 'put',
    data: { status }
  })
}

/**
 * 重置用户密码
 * @param {number} id - 用户ID
 */
export function resetUserPassword(id) {
  return request({
    url: `/users/${id}/reset-password`,
    method: 'put'
  })
}

/**
 * 获取用户角色列表
 */
export function getUserRoles() {
  return request({
    url: '/users/roles',
    method: 'get'
  })
}

/**
 * 更新用户角色
 * @param {number} id - 用户ID
 * @param {array} roles - 角色数组
 */
export function updateUserRoles(id, roles) {
  return request({
    url: `/users/${id}/roles`,
    method: 'put',
    data: { roles }
  })
}

/**
 * 上传用户头像
 * @param {FormData} data - 头像文件
 */
export function uploadUserAvatar(data) {
  return request({
    url: '/users/upload-avatar',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 获取用户统计信息
 */
export function getUserStats() {
  return request({
    url: '/users/stats',
    method: 'get'
  })
}

/**
 * 导出用户数据
 * @param {object} params - 导出参数
 */
export function exportUsers(params) {
  return request({
    url: '/users/export',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

/**
 * 导入用户数据
 * @param {FormData} data - Excel文件
 */
export function importUsers(data) {
  return request({
    url: '/users/import',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
} 