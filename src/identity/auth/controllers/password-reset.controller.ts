import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '@shared/decorators';
import { EmailService } from 'src/email/services/email.service';

import {
  RequestResetPasswordDto,
  ResetPasswordDto,
} from '../dtos/password-reset.dto';
import { AuthService } from '../services/auth.service';
import { PasswordResetService } from '../services/password-reset.service';

@Controller('password-reset')
export class PasswordResetController {
  constructor(
    private readonly passwordResetService: PasswordResetService,
    private readonly emailService: EmailService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('request')
  async requestReset(
    @Body() { email }: RequestResetPasswordDto,
  ): Promise<{ message: string }> {
    const token: string =
      await this.passwordResetService.createResetToken(email);

    await this.emailService.sendResetPasswordEmail(email, token);

    return {
      message: 'If the email exists, you will receive reset instructions',
    };
  }

  @Public()
  @Post('reset')
  async resetPassword(
    @Body() { email, token, newPassword }: ResetPasswordDto,
  ): Promise<{ message: string }> {
    await this.passwordResetService.validateAndConsumeToken(email, token);

    await this.authService.changePassword(email, newPassword);

    return { message: 'Password successfully updated' };
  }
}
