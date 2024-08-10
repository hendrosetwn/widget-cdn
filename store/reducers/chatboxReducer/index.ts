import { BucketTicket } from '@/interfaces/live-agent';
import { ChatboxAction, chatboxActionTypes } from '@/store/actions/chatboxAction';

export type ChatboxState = {
  activeChatbox: BucketTicket[];
  liveChatbox: BucketTicket[];
  historyChatbox: BucketTicket[];
  openedChatboxId: string[];
};

export const initialChatboxState: ChatboxState = {
  activeChatbox: [],
  openedChatboxId: [],
  liveChatbox: [],
  historyChatbox: [],
};

export const ACTIVE_CHATBOX = 'active_chatbox';

export const chatboxReducer = (state = initialChatboxState, action: ChatboxAction): ChatboxState => {
  const { type, payload } = action;
  let data = payload?.data;

  switch (type) {
    case chatboxActionTypes.SET_ACTIVE_CHATBOX: {
      if (data === undefined) return state;
      data = data as BucketTicket;

      if (
        state.activeChatbox.find(
          (it) => it.bucketTicketLiveAgentId === (data as BucketTicket).bucketTicketLiveAgentId
        ) !== undefined
      ) {
        const isMatch = state.openedChatboxId.find((it) => it === (data as string)) !== undefined;

        return {
          ...state,
          openedChatboxId: isMatch
            ? state.openedChatboxId?.filter((it) => it !== data)
            : [...state.openedChatboxId, data.bucketTicketLiveAgentId],
        };
      }

      const activeChatbox = state.activeChatbox.length > 0 ? [data, ...state.activeChatbox] : [data];

      const liveChatbox: BucketTicket[] = [];
      const historyChatbox: BucketTicket[] = [];

      for (const it of activeChatbox) {
        if (payload.isAgent && it.statusAgent === 'Closed') {
          historyChatbox.push(it);
        } else if (!payload.isAgent && it.statusBucket === 'Closed') {
          historyChatbox.push(it);
        } else {
          liveChatbox.push(it);
        }
      }

      return {
        activeChatbox,
        liveChatbox,
        historyChatbox,
        openedChatboxId:
          state.openedChatboxId.length > 0
            ? [...state.openedChatboxId, data.bucketTicketLiveAgentId]
            : [data.bucketTicketLiveAgentId],
      };
    }

    case chatboxActionTypes.SET_INACTIVE_CHATBOX: {
      if (data === undefined) return state;
      data = data as string;

      return {
        ...state,
        activeChatbox: state.activeChatbox?.filter((it) => it.bucketTicketLiveAgentId !== data),
        openedChatboxId: state.openedChatboxId?.filter((it) => it !== data),
        liveChatbox: state.liveChatbox?.filter((it) => it.bucketTicketLiveAgentId !== data),
        historyChatbox: state.historyChatbox?.filter((it) => it.bucketTicketLiveAgentId !== data),
      };
    }

    case chatboxActionTypes.SET_IS_MINIMIZE_CHATBOX: {
      const isMatch = state.openedChatboxId.find((it) => it === (data as string)) !== undefined;

      return {
        ...state,
        openedChatboxId: isMatch
          ? state.openedChatboxId?.filter((it) => it !== data)
          : [...state.openedChatboxId, data as string],
      };
    }

    case chatboxActionTypes.SET_MINIMIZE_ALL_CHATBOX:
      return {
        ...state,
        openedChatboxId: [],
      };

    case chatboxActionTypes.RESET_ACTIVE_CHATBOX:
      return initialChatboxState;

    default:
      return state;
  }
};
