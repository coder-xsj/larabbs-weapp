import { request, authRequest, uploadFile } from '@/utils/request'

export function getCurrentUser(data) {
  return authRequest('user')
}

export function updateAvatar(avatar) {
  return uploadFile('images', {
    method: 'POST',
    name: 'image',
    formData: {
      type: 'avatar'
    },
    filePath: avatar
  })
}

export function updateUser(data) {
  return authRequest('user', {
    method: 'PUT',
    data: data
  })
}

// 获取用户信息
export function getUser(id) {
  return request('users/' + id)
}

// 获取用户权限
export function getPerms() {
  return authRequest('user/permissions')
}
