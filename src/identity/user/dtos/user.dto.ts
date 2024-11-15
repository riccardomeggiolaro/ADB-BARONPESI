export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  picture?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
