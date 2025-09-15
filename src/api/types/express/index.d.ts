import { StaffSession } from "../express.types"; // You can import types for use inside the declaration

declare global {
  namespace Express {
    export interface Request {
      user?: StaffSession;
    }
  }
}