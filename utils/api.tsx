import axios, { AxiosError } from 'axios';
import { config } from './config';

export const api = axios.create({
  baseURL: config.server.apiUrl,
  // withCredentials: true, // Ensure cookies are sent with each request
});

export type FetchFunction = <T>(
  url: string,
  body?: any,
  headers?: any
) => Promise<T>;

export function createRequestMethod(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  onError: (error: AxiosError) => void
): FetchFunction {
  return async function (url: string, body: any, headers: any) {
    try {
      // Get currentWorkspace from localStorage
      const currentWorkspace = localStorage.getItem('currentWorkspace');
      const currentProgram = localStorage.getItem('currentProgram');

      // Prepare the default headers
      let defaultHeaders = {
        ...headers,
        [config.headers.WORKSPACE_HEADER]: currentWorkspace,
        [config.headers.PROGRAM_HEADER]: currentProgram,
      };

      // If the body is not FormData, set the Content-Type to application/json
      if (!(body instanceof FormData)) {
        defaultHeaders['Content-Type'] = 'application/json';
      }

      const response = await api(url, {
        method,
        data: body,
        withCredentials: true,
        headers: defaultHeaders,
      });

      return response.data;
    } catch (error) {
      console.error('API: error', error);
      onError(error);
      throw error;
    }
  };
}

export function createRequestMethods(onError: (error: AxiosError) => void) {
  return {
    get: createRequestMethod('GET', onError),
    post: createRequestMethod('POST', onError),
    put: createRequestMethod('PUT', onError),
    patch: createRequestMethod('PATCH', onError),
    delete: createRequestMethod('DELETE', onError),
  };
}
