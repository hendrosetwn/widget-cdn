import { LastConversation } from '@interfaces/conversationHistory';

export interface LastConversationAction {
  type: string;
  payload?: LastConversation;
}

export const lastConversationActionTypes = {
  SET_LAST_CONVERSATION: 'SET_LAST_CONVERSATION',
};

export function setLastConversation(data: LastConversation): LastConversationAction {
  return {
    type: lastConversationActionTypes.SET_LAST_CONVERSATION,
    payload: data,
  };
}
