import request from '@/utils/request'

export function getUserMB(params) {
  return request({
    url: '/guwu/search',
    method: 'get',
    params
  })
}
// TODO: formdata查询方式
export function fileUpload(params) {
  debugger
  return request({
    url: '/guwu/fileUpload',
    method: 'post',
    params
  })
}
