import { request } from '@/utils/request'

export function login(data) {
  return request('weapp/authorizations', {
    method: 'post',
    data: data
  })
}

export function logout(token) {
  return request('authorizations/current', {
    method: 'delete',
    header: {
      'Authorization': 'Bearer ' + token
    }
  })
}

export function refresh(token) {
  return request('authorizations/current', {
    method: 'put',
    header: {
      'Authorization': 'Bearer ' + token
    }
  })
}

export function getCaptcha(phone) {
  return request('captchas', {
    method: 'post',
    data: {
      phone: phone
    }
  })
}

export function getVerificationCode(key, code) {
  return request('verificationCodes', {
    method: 'post',
    data: {
      captcha_key: key,
      captcha_code: code
    }
  })
}

export function register(data) {
  return request('weapp/users', {
    method: 'post',
    data: data
  })
}

export function getUser() {
  return wx.getStorageSync('user')
}

export function setUser(user, perms) {
  return wx.setStorageSync('user', user)
}

export function getToken() {
  return wx.getStorageSync('access_token')
}

export function getTokenExpiredAt() {
  return wx.getStorageSync('access_token_expired_at')
}

export function setToken(tokenPayload) {
  const accessToken = tokenPayload.access_token
  const accessTokenExpiredAt = new Date().getTime() + tokenPayload.expires_in * 1000

  wx.setStorageSync('access_token', accessToken)
  wx.setStorageSync('access_token_expired_at', accessTokenExpiredAt)
}




