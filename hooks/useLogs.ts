import { LogType } from "~/utils/types/logType";
import { useApiAuth } from "./useApiAuth";
// hook for logging user actions

type LogsParams = {
  categoryId?: number;
  subcategoryId?: number;
  awardId?: number;
};

const useLogs = () => {
  const api = useApiAuth();
  const dispatchLog = async (
    logType: LogType,
    participantId: number,
    { categoryId, subcategoryId, awardId }: LogsParams
  ) => {
    try {
      await api.post("/logs", {
        type: logType,
        participantId,
        ...(categoryId && { categoryId }),
        ...(subcategoryId && { subcategoryId }),
        ...(awardId && { awardId }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    dispatchLog,
  };
};

export default useLogs;
