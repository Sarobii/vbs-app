import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function getUserFromToken(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as { userId: number, email: string };
  } catch (error) {
    return null;
  }
}