import request from '@/utils/request'
// import qs from 'qs'

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
