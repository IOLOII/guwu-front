import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/guwu/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/guwu/user/info',
    method: 'get'
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/guwu/user/logout',
    method: 'post'
  })
}

/**
 * @description 获取系统用户信息
 */
export function getUserInfoList(params) {
  return request({
    url: '/guwu/user/userInfoList',
    method: 'get',
    params
  })
}

