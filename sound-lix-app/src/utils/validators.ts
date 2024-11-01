import { ApiRequest, BaseRequest } from "@/models/api";
import { ValidationResult } from "@/models/validation";
import { API } from "./constants";

const validateApiRequest = <T extends BaseRequest>(
  request: ApiRequest<T>
): ValidationResult => {
  let errorMsg;

  if (!request.baseUrl) {
    errorMsg = "Invalid requst URL";
  } else if (request.queryParams.client_id != process.env.CLIENT_ID) {
    errorMsg = "Invalid client_id";
  } else if (
    Number(request.queryParams.limit) < API.MIN_RESULTS_LIMIT ||
    Number(request.queryParams.limit) > API.MAX_RESULTS_LIMIT
  ) {
    errorMsg = `Invalid limit value, not withing the range [${API.MIN_RESULTS_LIMIT} - ${API.MAX_RESULTS_LIMIT}]`;
  }

  return {
    isValid: !errorMsg,
    errorMsg: errorMsg,
  };
};

export { validateApiRequest };
