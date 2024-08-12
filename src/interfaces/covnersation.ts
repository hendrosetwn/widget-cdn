export type IAddConversation = {
  name: string;
  email: string;
  phoneNumber: string;
  channel: string;
};

export type IResponseCreateConversation = {
  conversationId: string;
  request: string;
  response: string;
  requestDate?: string;
  responseDate?: string;
  filePath?: string;
  fileType?: string;
  carousellId?: string;
  avatar?: string;
  botName?: string;
};

export type IResponseContinueConversation = {
  bucketLiveAgentId: string;
  conversationId: string;
  request: string;
  response: string;
  responseTime: string;
  timeoutTime: number;
};

export type IContinueConversation = {
  tenantId: string;
  conversationId: string;
  chat: string;
  userAccess: string;
};

export type ITimeoutConversation = {
  conversationId: string;
};
