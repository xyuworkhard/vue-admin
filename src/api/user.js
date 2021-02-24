import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/CSCE/user/login',
    method: 'post',
    data
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/CSCE/user/login',
//     method: 'get',
//     params: {
//       token
//     }
//   })
// }

export function logout() {
  return request({
    url: '/CSCE/user/outlogin',
    method: 'post'
  })
}

export function clearRedis() {
  return request({
    url: '/CSCE/user/ClearRedis',
    methods: 'get'
  })
}
