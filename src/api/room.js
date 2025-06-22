import request from '@/utils/request'

/**
 * 获取房间列表
 * @param {object} params - 查询参数
 * @param {number} params.page - 页码
 * @param {number} params.limit - 每页数量
 * @param {number} params.apartmentId - 公寓ID
 * @param {string} params.keyword - 搜索关键词
 * @param {string} params.status - 状态筛选
 * @param {number} params.minPrice - 最低价格
 * @param {number} params.maxPrice - 最高价格
 */
export function getRoomList(params) {
  return request({
    url: '/rooms',
    method: 'get',
    params
  })
}

/**
 * 获取房间详情
 * @param {number} id - 房间ID
 */
export function getRoomDetail(id) {
  return request({
    url: `/rooms/${id}`,
    method: 'get'
  })
}

/**
 * 创建房间
 * @param {object} data - 房间信息
 */
export function createRoom(data) {
  return request({
    url: '/rooms',
    method: 'post',
    data
  })
}

/**
 * 更新房间
 * @param {number} id - 房间ID
 * @param {object} data - 房间信息
 */
export function updateRoom(id, data) {
  return request({
    url: `/rooms/${id}`,
    method: 'put',
    data
  })
}

/**
 * 删除房间
 * @param {number} id - 房间ID
 */
export function deleteRoom(id) {
  return request({
    url: `/rooms/${id}`,
    method: 'delete'
  })
}

/**
 * 批量创建房间
 * @param {object} data - 批量创建数据
 * @param {number} data.apartmentId - 公寓ID
 * @param {array} data.rooms - 房间信息数组
 */
export function batchCreateRooms(data) {
  return request({
    url: '/rooms/batch',
    method: 'post',
    data
  })
}

/**
 * 批量删除房间
 * @param {array} ids - 房间ID数组
 */
export function batchDeleteRooms(ids) {
  return request({
    url: '/rooms/batch-delete',
    method: 'post',
    data: { ids }
  })
}

/**
 * 更新房间状态
 * @param {number} id - 房间ID
 * @param {string} status - 状态
 */
export function updateRoomStatus(id, status) {
  return request({
    url: `/rooms/${id}/status`,
    method: 'put',
    data: { status }
  })
}

/**
 * 上传房间图片
 * @param {FormData} data - 图片文件
 */
export function uploadRoomImage(data) {
  return request({
    url: '/rooms/upload-image',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 获取房间统计信息
 * @param {number} apartmentId - 公寓ID（可选）
 */
export function getRoomStats(apartmentId) {
  return request({
    url: '/rooms/stats',
    method: 'get',
    params: { apartmentId }
  })
}

/**
 * 获取公寓下的房间列表
 * @param {number} apartmentId - 公寓ID
 */
export function getRoomsByApartment(apartmentId) {
  return request({
    url: `/apartments/${apartmentId}/rooms`,
    method: 'get'
  })
}

/**
 * 导出房间数据
 * @param {object} params - 导出参数
 */
export function exportRooms(params) {
  return request({
    url: '/rooms/export',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

/**
 * 导入房间数据
 * @param {FormData} data - Excel文件
 */
export function importRooms(data) {
  return request({
    url: '/rooms/import',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
} 