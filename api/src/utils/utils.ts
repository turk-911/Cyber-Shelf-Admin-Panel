import { Request } from "express";
export interface jwtPayload {
    id: String;
}
export interface CustomError extends Error {
    status?: number;
}
export interface AuthenticatedRequest extends Request {
    user?: any;
}