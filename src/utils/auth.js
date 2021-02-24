import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const MarkKey = 'Admin-Mark'
const UserInfo = 'User-Info'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, {
    expires: 1
  })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getMark() {
  return Cookies.get(MarkKey)
}

export function setMark(mark) {
  return Cookies.set(MarkKey, mark, {
    expires: 1
  })
}

export function removeMark() {
  return Cookies.remove(MarkKey)
}

export function getUserInfo() {
  return Cookies.get(UserInfo)
}

export function setUserInfo(info) {
  return Cookies.set(UserInfo, info, {
    expires: 1
  })
}

export function removeUserInfo() {
  return Cookies.remove(UserInfo)
}
