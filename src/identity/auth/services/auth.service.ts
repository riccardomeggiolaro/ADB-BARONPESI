import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthProvider, Prisma, UserIdentity } from '@prisma/client';
import { isDefined, isStringDefined } from '@shared/utils';
import * as bcrypt from 'bcrypt';
import { User } from 'src/identity/user/dtos/user.dto';

import {
  UserIdentityService,
  UserIdentityWithUser,
} from '../../user/services/user-identity.service';
import { UserService } from '../../user/services/user.service';

import {
  ERROR_ACCOUNT_LINKED_PROVIDER,
  ERROR_EMAIL_EXISTS,
  ERROR_INVALID_CREDENTIALS,
  ERROR_USER_NOT_FOUND,
  PASSWORD_HASH_SALT_ROUNDS,
} from '../constants/auth.constants';
import { RegisterBodyDto } from '../dtos/body.dto';
import { AuthResponseDto } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userSrv: UserService,
    private readonly userIdentitySrv: UserIdentityService,
    private readonly jwtSrv: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const identity: UserIdentityWithUser | undefined =
      await this.userIdentitySrv.findByEmail(email);

    if (!isDefined(identity)) throw new NotFoundException(ERROR_USER_NOT_FOUND);

    await this.validateUserCredentials(identity, email, password);

    return new User(identity.user);
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  private async validateUserCredentials(
    identity: UserIdentity,
    email: string,
    password: string,
  ): Promise<void> {
    if (!isStringDefined(identity.password)) {
      throw new UnauthorizedException(
        ERROR_ACCOUNT_LINKED_PROVIDER.replace('{provider}', identity.provider),
      );
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      identity.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(`${ERROR_INVALID_CREDENTIALS} ${email}`);
    }
  }

  async register({
    email,
    password,
    ...userDto
  }: RegisterBodyDto): Promise<User> {
    const existingIdentity: UserIdentityWithUser | undefined =
      await this.userIdentitySrv.findByEmail(email);

    if (isDefined(existingIdentity)) {
      throw new BadRequestException(ERROR_EMAIL_EXISTS);
    }

    const hashedPassword: string = this.hashPassword(password);
    const user: User = await this.userSrv.create(userDto);

    const data: Prisma.UserIdentityCreateInput = {
      provider: AuthProvider.LOCAL,
      user: { connect: { id: user.id } },
      email,
      password: hashedPassword,
    };

    await this.userIdentitySrv.create(data);

    return user;
  }

  async login(user: User): Promise<AuthResponseDto> {
    return {
      user,
      accessToken: await this.jwtSrv.signAsync(user),
    };
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, PASSWORD_HASH_SALT_ROUNDS);
  }

  async changePassword(email: string, newPassword: string): Promise<void> {
    const hashedPassword: string = this.hashPassword(newPassword);

    await this.userIdentitySrv.changePassword(email, hashedPassword);
  }
}
