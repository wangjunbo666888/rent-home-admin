import request from '@/utils/request'

/**
 * 获取公寓列表
 * @param {object} params - 查询参数
 * @param {number} params.page - 页码
 * @param {number} params.limit - 每页数量
 * @param {string} params.keyword - 搜索关键词
 * @param {string} params.status - 状态筛选
 * @param {string} params.sortBy - 排序字段
 * @param {string} params.sortOrder - 排序方向
 */
export function getApartmentList(params) {
  return request({
    url: '/apartments',
    method: 'get',
    params
  })
}

/**
 * 获取公寓详情
 * @param {number} id - 公寓ID
 */
export function getApartmentDetail(id) {
  return request({
    url: `/apartments/${id}`,
    method: 'get'
  })
}

/**
 * 创建公寓
 * @param {object} data - 公寓信息
 */
export function createApartment(data) {
  return request({
    url: '/apartments',
    method: 'post',
    data
  })
}

/**
 * 更新公寓
 * @param {number} id - 公寓ID
 * @param {object} data - 公寓信息
 */
export function updateApartment(id, data) {
  return request({
    url: `/apartments/${id}`,
    method: 'put',
    data
  })
}

/**
 * 删除公寓
 * @param {number} id - 公寓ID
 */
export function deleteApartment(id) {
  return request({
    url: `/apartments/${id}`,
    method: 'delete'
  })
}

/**
 * 批量删除公寓
 * @param {array} ids - 公寓ID数组
 */
export function batchDeleteApartments(ids) {
  return request({
    url: '/apartments/batch-delete',
    method: 'post',
    data: { ids }
  })
}

/**
 * 更新公寓状态
 * @param {number} id - 公寓ID
 * @param {string} status - 状态
 */
export function updateApartmentStatus(id, status) {
  return request({
    url: `/apartments/${id}/status`,
    method: 'put',
    data: { status }
  })
}

/**
 * 上传公寓图片
 * @param {FormData} data - 图片文件
 */
export function uploadApartmentImage(data) {
  return request({
    url: '/apartments/upload-image',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 获取公寓统计信息
 */
export function getApartmentStats() {
  return request({
    url: '/apartments/stats',
    method: 'get'
  })
}

/**
 * 导出公寓数据
 * @param {object} params - 导出参数
 */
export function exportApartments(params) {
  return request({
    url: '/apartments/export',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

/**
 * 导入公寓数据
 * @param {FormData} data - Excel文件
 */
export function importApartments(data) {
  return request({
    url: '/apartments/import',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
} 