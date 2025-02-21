import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/identity/user/dtos/user.dto';

export class AuthResponseDto {
  @ApiProperty({
    description: 'The authenticated user object containing user details.',
  })
  user: User;

  @ApiProperty({
    description:
      'The access token for the user, used for authentication in subsequent requests.',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;
}
