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

// TODO: formdata查询方式
export function fileUpload(data) {
  return request({
    url: '/guwu/fileUpload',
    method: 'post',
    data
  })
}

export function startAffair(data) {
  return request({
    url: '/guwu/importExcel2Sql',
    method: 'post',
    data
    // data: qs.stringify({ a: '123', b: '23' })
  })
}
