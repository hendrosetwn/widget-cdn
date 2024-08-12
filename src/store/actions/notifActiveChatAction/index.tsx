interface Payload {
  bucketTicketLiveAgentId: string
}

export interface NotifActiveChatAction {
  type: string
  payload?: Payload
}

export const notifActiveChatActionTypes = {
  INCREMENT_UNREAD_MESSAGE: 'INCREMENT_UNREAD_MESSAGE',
  DELETE_UNREAD_NOTIF: 'DELETE_UNREAD_NOTIF',
}

export function setIncrementUnreadMessage(data: Payload): NotifActiveChatAction {
  return {
    type: notifActiveChatActionTypes.INCREMENT_UNREAD_MESSAGE,
    payload: data,
  }
}

export function setDeleteUnreadNotif(data: Payload): NotifActiveChatAction {
  return {
    type: notifActiveChatActionTypes.DELETE_UNREAD_NOTIF,
    payload: data,
  }
}
