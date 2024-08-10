import { API_URL_PREVIEW_FILE } from '@/utils/environment';
import satellite from '@/services/satellite';

export function apiGetDocumentFile(filename: string) {
  return satellite.get(`${API_URL_PREVIEW_FILE}/${filename}`, {
    responseType: 'blob',
  });
}
