/**
 * Custom Error class for handling API-specific errors.
 * This allows us to create errors with a specific HTTP status code,
 * which can then be used by our centralized error handler to send a
 * consistent, structured response to the client.
 */
declare class ApiError extends Error {
    statusCode: number;
    success: boolean;
    /**
     * @param statusCode The HTTP status code for the error (e.g., 400, 404, 500).
     * @param message A clear, user-friendly error message.
     * @param stack Optional stack trace. If not provided, it will be captured.
     */
    constructor(statusCode: number, message: string, stack?: string);
}
export { ApiError };
//# sourceMappingURL=ApiError.d.ts.map