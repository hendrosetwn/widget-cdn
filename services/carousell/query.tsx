import { IGetCustomerCarousell } from '@/interfaces/carousell';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getCustomerCarousell } from './api';

export function useGetCustomerCarousell(params: IGetCustomerCarousell, enabled?: boolean) {
  return useQuery({
    queryKey: ['get customer carousell', params],
    queryFn: () => getCustomerCarousell(params).then((res) => res.data),
    placeholderData: keepPreviousData,
    enabled: enabled ?? true,
  });
}
