'use strict'

import message from '@views/message'
import messageList from '@views/message/list'

export default [
  {
    path: '/message',
    component: message,
    meta: {
      title: '消息中心',
      isLogin: true
    }
  }, {
    path: '/messageList/:id',
    component: messageList,
    meta: {
      title: '消息中心'
    }
  }
]
