import axios from "axios";
import type { ApiErrorResponse } from "../types/api";

export function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.error ?? "Unexpected API error";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
}

