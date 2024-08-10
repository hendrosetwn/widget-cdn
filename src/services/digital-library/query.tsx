import { useQuery } from '@tanstack/react-query';
import { apiGetDocumentFile } from './api';

export function useGetDocumentFile(fileName: string, enabled: boolean) {
  return useQuery({
    queryKey: ['doc-file', fileName],
    queryFn: () => apiGetDocumentFile(fileName).then((resp) => resp.data),
    enabled,
  });
}
