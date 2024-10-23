export interface jwtPayload {
    id: String;
}
export interface CustomError extends Error {
    status?: number;
}