import {
  IAddConversation,
  IContinueConversation,
  IResponseContinueConversation,
  IResponseCreateConversation,
  ITimeoutConversation,
} from '@/interfaces/covnersation';
import { APIBaseResponse } from '@/interfaces/api';
import satellite from '../satellite';
import { API_URL_CONVERSATION } from '@/utils/environment';

export function apiPostConversation(data: IAddConversation) {
  return satellite.post<APIBaseResponse<IResponseCreateConversation>>(
    API_URL_CONVERSATION + `/conversation/create`,
    data
  );
}

export function apiPostContinueConversation(data: IContinueConversation) {
  return satellite.post<APIBaseResponse<IResponseContinueConversation>>(
    API_URL_CONVERSATION + `/conversation/continue`,
    data
  );
}

export function apiPostTimeoutConversation(data: ITimeoutConversation) {
  return satellite.post<APIBaseResponse>(API_URL_CONVERSATION + `/conversation/timeout`, data);
}
