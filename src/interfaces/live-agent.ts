export interface BucketTicket {
  bucketTicketLiveAgentId: string;
  conversationId: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
  closedAt: string;
  statusBucket: string;
  statusAgent: string;
  priority: string;
  channel: string;
  agent: string;
  lastConversation: string;
}

export interface DetailCustomer {
  bucketTicketLiveAgentId: string;
  conversationId: string;
  channel: string;
  name: string;
  phoneNumber: string;
  email: string;
}

export interface IUpdateCustomer {
  conversationId: string;
  name: string;
  phoneNumber: string;
  email: string;
  socialData: string;
  valueSocialData: string;
  isVip: boolean;
}
