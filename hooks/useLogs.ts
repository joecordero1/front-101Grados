import { UAParser } from 'ua-parser-js';

import { LogType } from '~/utils/types/logType';
import { useApiAuth } from './useApiAuth';
// hook for logging user actions

type LogParams<T extends LogType> = T extends
  | LogType.OPEN_CATEGORY
  | LogType.CLICK_MORE_FROM_CATEGORY
  ? { categoryId: number }
  : T extends LogType.OPEN_SUBCATEGORY
  ? { subcategoryId: number }
  : T extends
      | LogType.OPEN_AWARD
      | LogType.OPEN_QUICK_VIEW_AWARD
      | LogType.ADD_TO_CART
      | LogType.REMOVE_FROM_CART
      | LogType.BUY_AWARD
  ? { awardId: number; awardPoints: number }
  : T extends LogType.ADD_TO_WISHLIST | LogType.REMOVE_FROM_WISHLIST
  ? { awardId: number; awardPoints: number; wishlistId: number }
  : T extends
      | LogType.CLICK_MORE_FEATURED_AWARDS
      | LogType.CLICK_MORE_MOST_REDEEMED_AWARDS
      | LogType.CLICK_MORE_REACHABLE_AWARDS
      | LogType.OPEN_MY_REQUESTS
      | LogType.OPEN_MY_ACCOUNT_BALANCE
  ? {}
  : T extends LogType.SEARCH_AWARD
  ? { searchText: string }
  : never;

export const useLogs = () => {
  const api = useApiAuth();
  // const parser = new UAParser('user-agent');
  const parser = new UAParser();

  const dispatchLog = async <T extends LogType>(
    type: T,
    params: LogParams<T>
  ) => {
    try {
      const device = parser.getDevice();
      const os = parser.getOS();

      await api.post('/lala4/logs', {
        type,
        ...params,
        device: device.type || 'Desktop',
        os: os.name || 'unknown',
        version: os.version || 'unknown',
      });
    } catch (error) {
      console.error('dispatchLog() ->', error);
    }
  };

  return {
    dispatchLog,
  };
};
