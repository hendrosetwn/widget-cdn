export interface AnalyticsAction {
  type: string
  payload?: any
}

export const analyticsActionTypes = {
  SET_PRODUCTIVE_TIME: 'SET_PRODUCTIVE_TIME',
}

export function setProductiveTime(): AnalyticsAction {
  return {
    type: analyticsActionTypes.SET_PRODUCTIVE_TIME,
  }
}
