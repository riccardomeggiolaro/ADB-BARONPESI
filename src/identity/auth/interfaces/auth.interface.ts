import type { User } from 'src/identity/user/schemas/user.schema';

export interface AuthResponseDto {
  user: User;
  accessToken: string;
}
