import axios from "axios";
import {
  ApiRequest,
  ApiResponse,
  BaseRequest,
  BaseResponse,
  StatusResponse,
} from "../models/api";
import { formatRequestUrl } from "@/utils/formatters";
import { ValidationResult } from "@/models/validation";
import { validateApiRequest } from "@/utils/validators";

const OK_STATUS: number = 200;
const BAD_REQUEST_STATUS: number = 400;

const fetchData = async <
  U extends BaseRequest,
  T extends BaseResponse | string
>(
  request: ApiRequest<U>
): Promise<ApiResponse<T>> => {
  try {
    const validation: ValidationResult = validateApiRequest(request);

    if (validation.isValid) {
      const url: string = formatRequestUrl(request);
      const response = await axios.get(url, {
        validateStatus: (status) =>
          status >= OK_STATUS && status < BAD_REQUEST_STATUS,
      });

      return {
        headers: response.data.headers,
        results: response.data?.results
          ? response.data.results
          : ([response.data] as T[]),
      };
    }

    throw new Error(validation.errorMsg);
  } catch (error: unknown) {
    let message: string;

    if (error instanceof Error) {
      message = error.message;
    } else if (error && typeof error === "object" && "message" in error) {
      message = String(error.message);
    } else if (typeof error === "string") {
      message = error;
    } else {
      message = "Unknown error";
    }

    return {
      headers: {
        code: -1,
        results_count: 0,
        error_message: message,
        status: StatusResponse.Failed,
      },
      results: [],
    };
  }
};

export { fetchData };
