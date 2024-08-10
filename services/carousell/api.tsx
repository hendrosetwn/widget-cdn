import { APIBaseResponse } from '@/interfaces/api';
import { ICarousell, IGetCustomerCarousell } from '@/interfaces/carousell';
import satellite from '@/services/satellite';
import { API_URL_CHATBOT } from '@/utils/environment';

export function getCustomerCarousell(params: IGetCustomerCarousell) {
  return satellite.get<APIBaseResponse<ICarousell[]>>(API_URL_CHATBOT + '/carousell/customer/get-list', { params });
}
