import { LastConversation } from '@interfaces/conversationHistory';
import { LastConversationAction, lastConversationActionTypes } from '@store/actions/lastConversationAction';

type LastConversationState = {
  data: LastConversation[];
};

const initialState: LastConversationState = {
  data: [],
};

export const lastConversationReducer = (
  state = initialState,
  action: LastConversationAction
): LastConversationState => {
  const { type } = action;

  switch (type) {
    case lastConversationActionTypes.SET_LAST_CONVERSATION: {
      if (action.payload === undefined) {
        return state;
      }

      const matchData = state.data.find((it) => it.conversationId === action.payload?.conversationId);

      if (!matchData) {
        return { data: [action.payload] };
      }

      const newListData: LastConversation[] = state.data.map((it) => {
        if (it.conversationId === action.payload?.conversationId) {
          it = {
            ...it,
            ...action.payload,
          };
        }
        return it;
      });

      return { data: newListData };
    }

    default:
      return state;
  }
};
