import { request, authRequest } from '@/utils/request';

// 获取话题数据
export function getReplies(topicId, data) {
  return request('topics/' + topicId + '/replies', {
    data: data
  })
}
