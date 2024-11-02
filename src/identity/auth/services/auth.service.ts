import { SALT_ROUNDS } from '@core/constants/auth.constant';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isDefined, isStringDefined } from '@shared/utils';
import * as bcrypt from 'bcrypt';
import { UpdateWriteOpResult } from 'mongoose';
import { UserMapper } from 'src/identity/user/mappers/user.mapper';
import { UserIdentity } from 'src/identity/user/schemas/user-identity.schema';
import { MongoUser, User } from 'src/identity/user/schemas/user.schema';
import { LeanDocument } from 'src/shared/types';

import { UserIdentityService } from '../../user/services/user-identity.service';
import { UserService } from '../../user/services/user.service';

import { RegisterDto } from '../dtos/auth.dto';
import { AuthResponseDto } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
  // eslint-disable-next-line @typescript-eslint/max-params
  constructor(
    private readonly userSrv: UserService,
    private readonly userIdentitySrv: UserIdentityService,
    private readonly jwtSrv: JwtService,
    private readonly userMapper: UserMapper,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const identity: LeanDocument<UserIdentity> | undefined =
      await this.userIdentitySrv.findByEmail(email);

    if (!isDefined(identity)) throw new NotFoundException();

    await this.validateUserCredentials(identity, email, password);

    return this.userMapper.mapToEntity(
      identity.user as LeanDocument<MongoUser>,
    );
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  private async validateUserCredentials(
    identity: UserIdentity,
    email: string,
    password: string,
  ): Promise<void> {
    if (!isStringDefined(identity.credentials.hashedPassword)) {
      throw new UnauthorizedException(
        `Account is linked to ${identity.provider} provider. Please login using that provider.`,
      );
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      identity.credentials.hashedPassword,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        `Invalid credentials for email: ${email}`,
      );
    }
  }

  async register({ email, password, ...userDto }: RegisterDto): Promise<User> {
    const existingIdentity: UserIdentity | undefined =
      await this.userIdentitySrv.findByEmail(email);

    if (isDefined(existingIdentity)) {
      throw new BadRequestException('An user with this email already exists');
    }

    const hashedPassword: string = this.hashPassword(password);
    const user: User = await this.userSrv.create(userDto);

    await this.userIdentitySrv.create({
      provider: 'local',
      user: user.id,
      credentials: {
        email,
        hashedPassword,
      },
    });

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
    return bcrypt.hashSync(password, SALT_ROUNDS);
  }

  async changePassword(
    email: string,
    newPassword: string,
  ): Promise<UpdateWriteOpResult> {
    const hashedPassword: string = this.hashPassword(newPassword);

    return this.userIdentitySrv.changePassword(email, hashedPassword);
  }
}
