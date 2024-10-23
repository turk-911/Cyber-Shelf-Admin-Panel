import { CustomError } from "./utils";
export const createError = (status: number, message: string): CustomError => {
    const err: CustomError = new Error(message);
    err.status = status;
    return err;
}