import { NotifActiveChatAction, notifActiveChatActionTypes } from '@/store/actions/notifActiveChatAction';

type NotifActiveChatState = {
  data: {
    bucketTicketLiveAgentId: string;
    unreadMessageCount: number;
  }[];
};

const initialState: NotifActiveChatState = {
  data: [],
};

export const notifActiveChatReducer = (state = initialState, action: NotifActiveChatAction): NotifActiveChatState => {
  const { type } = action;

  switch (type) {
    case notifActiveChatActionTypes.INCREMENT_UNREAD_MESSAGE: {
      if (!action.payload?.bucketTicketLiveAgentId) return state;

      const isMatch = state.data.find((it) => it.bucketTicketLiveAgentId === action.payload?.bucketTicketLiveAgentId);

      if (!isMatch) {
        return {
          data: [
            ...state.data,
            {
              bucketTicketLiveAgentId: action.payload?.bucketTicketLiveAgentId,
              unreadMessageCount: 1,
            },
          ],
        };
      }

      const data = state.data.map((it) => {
        if (it.bucketTicketLiveAgentId === action.payload?.bucketTicketLiveAgentId) {
          it = {
            ...it,
            unreadMessageCount: it.unreadMessageCount + 1,
          };
        }

        return it;
      });

      return {
        data,
      };
    }

    case notifActiveChatActionTypes.DELETE_UNREAD_NOTIF: {
      return {
        data: state.data.filter((it) => it.bucketTicketLiveAgentId !== action.payload?.bucketTicketLiveAgentId),
      };
    }

    default:
      return state;
  }
};
