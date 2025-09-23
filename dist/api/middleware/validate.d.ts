import type { Request, Response, NextFunction } from 'express';
import { ZodObject } from 'zod';
/**
 * A middleware function that validates the request body, params, and query
 * against a provided Zod schema.
 * @param schema The Zod schema to validate against.
 */
export declare const validate: (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validate.d.ts.map