import { BucketTicket } from '@/interfaces/live-agent';

export interface ChatboxAction {
  type: any;
  payload: {
    isAgent?: boolean;
    data?: BucketTicket | string;
  };
}

export const chatboxActionTypes = {
  SET_ACTIVE_CHATBOX: 'SET_ACTIVE_CHATBOX',
  SET_INACTIVE_CHATBOX: 'SET_INACTIVE_CHATBOX',
  SET_IS_MINIMIZE_CHATBOX: 'SET_IS_MINIMIZE_CHATBOX',
  SET_MINIMIZE_ALL_CHATBOX: 'SET_MINIMIZE_ALL_CHATBOX',
  RESET_ACTIVE_CHATBOX: 'RESET_ACTIVE_CHATBOX',
};

export function setActiveChatbox(data: BucketTicket, isAgent: boolean): ChatboxAction {
  return {
    type: chatboxActionTypes.SET_ACTIVE_CHATBOX,
    payload: { data, isAgent },
  };
}

export function setInactiveChatbox(ticketId: string): ChatboxAction {
  return {
    type: chatboxActionTypes.SET_INACTIVE_CHATBOX,
    payload: { data: ticketId },
  };
}

export function setMinimizeChatbox(chatId: string): ChatboxAction {
  return {
    type: chatboxActionTypes.SET_IS_MINIMIZE_CHATBOX,
    payload: { data: chatId },
  };
}

export function setMinimizeAllChatbox(): ChatboxAction {
  return {
    type: chatboxActionTypes.SET_MINIMIZE_ALL_CHATBOX,
    payload: {},
  };
}

export function resetActiveChatbox(): ChatboxAction {
  return {
    type: chatboxActionTypes.RESET_ACTIVE_CHATBOX,
    payload: {},
  };
}
