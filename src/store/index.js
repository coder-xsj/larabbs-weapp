import Vuex from '@wepy/x';
import users from './modules/user'
import notification from './modules/notification'

// 导出 store 对象
export default new Vuex.Store({
  modules: {
    users,
    notification
  }
})
