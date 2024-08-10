import { useMutation } from '@tanstack/react-query';
import { apiPostContinueConversation, apiPostConversation, apiPostTimeoutConversation } from './api';
import { IAddConversation, IContinueConversation, ITimeoutConversation } from '@interfaces/covnersation';

export function usePostConversation() {
  return useMutation({
    mutationKey: ['create conversation'],
    mutationFn: (data: IAddConversation) => apiPostConversation(data).then((res) => res.data),
  });
}

export function usePostContinueConversation() {
  return useMutation({
    mutationKey: ['continue conversation'],
    mutationFn: (data: IContinueConversation) => apiPostContinueConversation(data).then((res) => res.data),
  });
}

export function usePostTimeoutConversation() {
  return useMutation({
    mutationKey: ['timeout conversation'],
    mutationFn: (data: ITimeoutConversation) => apiPostTimeoutConversation(data).then((res) => res.data),
  });
}
