import request from '@/utils/request'

export function getUserMB(params) {
  return request({
    url: '/guwu/search',
    method: 'get',
    params
  })
}
