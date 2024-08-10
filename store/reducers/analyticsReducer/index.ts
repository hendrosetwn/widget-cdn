import { AnalyticsAction, analyticsActionTypes } from '@/store/actions/analyticsAction';

type AnalyticsState = {
  currentActiveTime: number;
};

const initialState: AnalyticsState = {
  currentActiveTime: 0,
};

export const analyticsReducer = (state = initialState, action: AnalyticsAction): AnalyticsState => {
  const { type } = action;

  switch (type) {
    case analyticsActionTypes.SET_PRODUCTIVE_TIME:
      return { ...state, currentActiveTime: state.currentActiveTime + 1 };

    default:
      return state;
  }
};
