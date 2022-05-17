import { request, authRequest } from '@/utils/request';

// 获取话题数据
export function getReplies(topicId, data) {
  return request('topics/' + topicId + '/replies', {
    data: data
  })
}

// 获取用户发布的评论
export function getUserReplies(userId, data) {
  return request('users/' + userId + '/replies', {
    data: data
  })
}
