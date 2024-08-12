export interface Chat {
  senderId: string
  senderName: string
  receiverId: string
  message: string
  isLiveAgent: boolean
  status: 'MESSAGE' | 'IMAGE'
}
