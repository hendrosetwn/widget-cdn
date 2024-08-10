// index.js pada page reducers
import { combineReducers } from '@reduxjs/toolkit'
import { chatboxReducer } from './chatboxReducer'
import { analyticsReducer } from './analyticsReducer'
import { lastConversationReducer } from './lastConversationReducer'
import { notifActiveChatReducer } from './notifActiveChatReducer'

const rootReducer = combineReducers({
  analyticsReducer,
  chatboxReducer,
  lastConversationReducer,
  notifActiveChatReducer,
})

export default rootReducer
