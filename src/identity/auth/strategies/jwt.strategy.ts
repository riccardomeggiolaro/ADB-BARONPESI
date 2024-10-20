import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { isDefined } from '@shared/utils';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/identity/user/schemas/user.schema';
import { UserService } from 'src/identity/user/services/user.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userSrv: UserService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.secret'),
    });
  }

  async validate(payload: { id: string }): Promise<User> {
    const user: User | undefined = await this.userSrv.findById(payload.id);
    if (!isDefined(user)) throw new UnauthorizedException();

    return user;
  }
}
