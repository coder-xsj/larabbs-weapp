import wepy from '@wepy/core'

import { getNotificationStats, readNotifications } from '@/api/notification'

const state = {
  unreadCount: 0
}

// 定义 getters
var getters = {
  unreadCount: state => state.unreadCount
}

// 定义 actions
const actions = {
  // 更新通知数量
  async updateUnreadCount ({ commit, getters }, params = {}) {
    if (!getters.isLoggedIn) {
      return
    }

    const statsResponse = await getNotificationStats({}, false)

    commit('setUnreadCount', statsResponse.data.unread_count)
  },
  // 设置已读
  async readNotifications ({ commit }, parmams = {}) {
    const statsResponse = await readNotifications()
    commit('setUnreadCount', 0)
  }
}

// 定义 mutations
const mutations = {
  setUnreadCount(state, count) {
    state.unreadCount = count
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
