import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isDefined } from '@shared/utils';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../../user/services/user.service';
import {
  ERROR_EMAIL_EXISTS,
  ERROR_INVALID_CREDENTIALS,
  ERROR_USER_NOT_FOUND,
  PASSWORD_HASH_SALT_ROUNDS,
} from '../constants/auth.constants';
import { RegisterBodyDto } from '../dtos/body.dto';
import { AuthResponseDto } from '../interfaces/auth.interface';
import { instanceToPlain } from 'class-transformer';
import { User as PrismaUser } from '@prisma/client';
import { User } from 'src/identity/user/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userSrv: UserService,
    private readonly jwtSrv: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user: User | undefined = await this.userSrv.findByEmail(email);

    if (!isDefined(user)) throw new NotFoundException(ERROR_USER_NOT_FOUND);

    await this.validateUserCredentials(user, email, password);

    return user;
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  private async validateUserCredentials(
    identity: User,
    email: string,
    password: string,
  ): Promise<void> {
    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      identity.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(`${ERROR_INVALID_CREDENTIALS} ${email}`);
    }
  }

  async register(registerBodyDTO: RegisterBodyDto): Promise<User> {
    const existingIdentity: User | undefined = await this.userSrv.findByEmail(registerBodyDTO.email);

    if (isDefined(existingIdentity)) {
      throw new BadRequestException(ERROR_EMAIL_EXISTS);
    }

    try {
      const hashedPassword: string = this.hashPassword(registerBodyDTO.password);
      const user: User = await this.userSrv.create({
        firstName: registerBodyDTO.firstName,
        lastName: registerBodyDTO.lastName,
        picture: registerBodyDTO.picture,
        company: { connect: { id: registerBodyDTO.companyId } },
        email: registerBodyDTO.email,
        password: hashedPassword
      });

      return user;
    } catch(err) {
      if (err.code === "P2025") {
        throw new NotFoundException(`La azienda con ID '${registerBodyDTO.companyId}' non esiste`);
      }
      throw new Error(err.message);
    }
  }

  async login(user: User): Promise<AuthResponseDto> {
    return {
      user,
      accessToken: await this.jwtSrv.signAsync(instanceToPlain(user)),
    };
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, PASSWORD_HASH_SALT_ROUNDS);
  }

  async changePassword(id: string, newPassword: string): Promise<void> {
    const hashedPassword: string = this.hashPassword(newPassword);

    await this.userSrv.updatePassword(id, hashedPassword);
  }
}