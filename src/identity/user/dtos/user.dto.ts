import { Company as PrismaCompany, User as PrismaUser } from '@prisma/client';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const selectOptions = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
  isActive: true,
  company: true,
  createdAt: true,
  updatedAt: true,
  picture: true,
  companyId: false,
  password: true
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  company?: PrismaCompany | null;
  createdAt: Date;
  updatedAt: Date;
  picture: string | null;
  password: string;
}