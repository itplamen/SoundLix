import axios from "axios";
import {
  ApiRequest,
  ApiResponse,
  BaseRequest,
  BaseResponse,
  StatusResponse,
} from "../models/api";
import { formatRequestUrl } from "@/utils/formatters";

const OK_STATUS: number = 200;
const BAD_REQUEST_STATUS: number = 400;

const fetchData = async <U extends BaseRequest, T extends BaseResponse>(
  request: ApiRequest<U>
): Promise<ApiResponse<T>> => {
  try {
    const url: string = formatRequestUrl(request);
    const response = await axios.get(url, {
      validateStatus: (status) =>
        status >= OK_STATUS && status < BAD_REQUEST_STATUS,
    });

    return {
      headers: response.data.headers,
      results: response.data.results as T[],
    };
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
