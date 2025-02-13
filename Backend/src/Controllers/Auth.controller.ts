import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { validateLoginInput } from '../validations/auth.validation';
import { LoginInput } from '../Types/user.Types';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
    try {
  
      const { username, password } = req.body as LoginInput;
  

      const user = await prisma.employee.findUnique({ where: { username } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '8h' }
      );
  

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 8 * 60 * 60 * 1000,
        sameSite: 'strict'
      });
  

      res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        department: user.departmentId
      });
  
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
export const logout = (req: Request, res: Response) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};