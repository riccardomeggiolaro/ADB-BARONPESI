export class CreateUserIdentityDto {
  user: string;
  provider: string;
  credentials: {
    email: string;
    hashedPassword: string;
  };
}
