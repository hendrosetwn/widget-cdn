'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/storage';
import { ToastContainer } from 'react-toastify';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from '@/services/config/queryClient';

export default function ContainerProvider({ children }: { readonly children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position='top-right'
          autoClose={2000}
          hideProgressBar
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme='colored'
        />
        {children}
        <ReactQueryDevtools buttonPosition='bottom-left' />
      </QueryClientProvider>
    </Provider>
  );
}
