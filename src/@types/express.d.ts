import { StaffSession, DonorSession } from '../api/types/session.types';

declare global {
  namespace Express {
    export interface Request {
      user?: StaffSession | DonorSession; // `user` can be either type
    }
  }
}