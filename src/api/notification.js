import { authRequest } from '@/utils/request'

// 通知数量
export function getNotificationStats(...params) {
  return authRequest('notifications/stats', ...params)
}

// 通知数据
export function getNotifications() {
  return authRequest('notifications')
}

// 标记消息已读
export function readNotifications() {
  return authRequest('user/read/notifications', {
    method: 'PUT'
  })
}
