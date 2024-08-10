export interface ConversationHistory {
  conversationId: string;
  name: string;
  email: string;
  channel: string;
  createdAt: string;
}

export interface ConversationHistoryDetail {
  conversationId: string;
  name: string;
  email: string;
  channel: string;
  statusTicket: string;
  chat: ConversationHistoryChat[];
}

export interface ConversationHistoryChat {
  message: string;
  type: string;
  createdAt: string;
}

export interface LastConversation {
  conversationId: string;
  message: string;
  status: string;
  lastConversationDate: string;
}
