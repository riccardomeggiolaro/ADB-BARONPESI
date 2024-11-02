import { randomBytes } from 'crypto';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isDefined } from '@shared/utils';
import { Document } from 'mongoose';
import { Model } from 'mongoose';
import { PasswordReset } from 'src/identity/auth/schemas/password-reset.schema';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectModel(PasswordReset.name)
    private readonly passwordResetModel: Model<PasswordReset>,
  ) {}

  async createResetToken(email: string): Promise<string> {
    await this.passwordResetModel
      .updateMany({ email, used: false }, { used: true })
      .exec();

    const token: string = randomBytes(32).toString('hex');

    await this.passwordResetModel.create({
      expiresAt: new Date(Date.now() + 900000),
      email,
      token,
    });

    return token;
  }

  async validateAndConsumeToken(email: string, token: string): Promise<void> {
    const resetRequest: Document<PasswordReset> | null =
      await this.passwordResetModel.findOneAndUpdate(
        {
          email,
          token,
          used: false,
          expiresAt: { $gt: new Date() },
        },
        { used: true },
      );

    if (!isDefined(resetRequest)) {
      throw new NotFoundException('Invalid or expired token');
    }
  }
}
