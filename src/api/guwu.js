import request from '@/utils/request'
// eslint-disable-next-line no-unused-vars
import qs from 'qs'

export function getUserMB(params) {
  return request({
    url: '/guwu/search',
    method: 'get',
    params
  })
}

// 文件上传
export function fileUpload(data) {
  return request({
    url: '/guwu/fileUpload',
    method: 'post',
    data
  })
}

// 开始excel转sql
export function startAffair(data) {
  return request({
    url: '/guwu/importExcel2Sql',
    method: 'post',
    data
    // data: qs.stringify({ a: '123', b: '23' })
  })
}

// 获取文件列表
export function getFileList(params) {
  return request({
    url: '/guwu/fileList',
    method: 'get',
    params
  })
}
// 混合两张表的数据
export function mixSqlData2Temp(data) {
  return request({
    url: '/guwu/mixTikDa',
    method: 'post',
    data
    // data: qs.stringify({ a: '123', b: '23' })
  })
}
