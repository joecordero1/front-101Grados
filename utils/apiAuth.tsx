import axios, { AxiosError } from 'axios';

import { config } from './config';

export const api = axios.create({ baseURL: config.server.apiUrl });

export type FetchFunction = <T>(
  url: string,
  body?: any,
  headers?: any
) => Promise<T>;

export function createRequestMethod(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  token: string,
  onError: (error: AxiosError) => void
): FetchFunction {
  return async function (url: string, body: any, headers: any) {
    try {
      const response = await api(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          ...(headers || {}),
        },
        data: body,
      });
      return response.data;
    } catch (error) {
      console.error('API: error', error);
      onError(error);
      throw error;
    }
  };
}

export function createRequestMethods(
  token: string,
  onError: (error: AxiosError) => void
) {
  return {
    get: createRequestMethod('GET', token, onError),
    post: createRequestMethod('POST', token, onError),
    put: createRequestMethod('PUT', token, onError),
    patch: createRequestMethod('PATCH', token, onError),
    delete: createRequestMethod('DELETE', token, onError),
  };
}
