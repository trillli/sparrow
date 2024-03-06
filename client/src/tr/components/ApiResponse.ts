import { AppError } from "./AppError";
import { Message } from "./message";

export interface ApiResponse {
  data: Message | null;
  error: AppError | null;
}
