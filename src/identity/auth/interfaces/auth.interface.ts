import type { User } from '../../user/dtos/user.dto';

export interface AuthResponseDto {
  user: User;
  accessToken: string;
}
