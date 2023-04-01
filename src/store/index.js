import { createStore } from 'vuex'

import { account } from './modules/auth/'
import { Post } from './modules/posts'

export default createStore({

  modules: {
    account,
    Post,
  }
})
