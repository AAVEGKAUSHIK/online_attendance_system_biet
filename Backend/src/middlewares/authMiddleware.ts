// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { EmployeeRole } from '../constants';
import prisma from '../config/prisma';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { 
      id: string ;
      role: string ;
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  next();
};

export const authorize = () => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || !EmployeeRole.includes(req.user.role)) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }
  next();
};
