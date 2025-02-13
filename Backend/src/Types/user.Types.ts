import {EmployeeRole} from '../constants';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export type LoginInput = {
  username: string;
  password: string;
};

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}