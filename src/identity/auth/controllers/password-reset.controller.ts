import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@shared/decorators';
import { EmailService } from 'src/email/services/email.service';

import {
  PASSWORD_RESET_EMAIL_SENT,
  PASSWORD_RESET_SUCCESSFUL,
} from '../constants/password-reset.constants';
import {
  RequestResetPasswordBodyDto,
  ResetPasswordBodyDto,
} from '../dtos/body.dto';
import { AuthService } from '../services/auth.service';
import { PasswordResetService } from '../services/password-reset.service';

@ApiTags('password-reset')
@Public()
@Controller('password-reset')
export class PasswordResetController {
  constructor(
    private readonly passwordResetService: PasswordResetService,
    private readonly emailService: EmailService,
    private readonly authService: AuthService,
  ) {}

  @Post('request')
  @ApiOperation({ summary: 'Request a password reset token' })
  @ApiBody({ type: RequestResetPasswordBodyDto })
  @ApiOkResponse({
    description: PASSWORD_RESET_EMAIL_SENT,
    schema: { example: { message: PASSWORD_RESET_EMAIL_SENT } },
  })
  async requestReset(
    @Body() { email }: RequestResetPasswordBodyDto,
  ): Promise<{ message: string }> {
    const token: string =
      await this.passwordResetService.createResetToken(email);

    await this.emailService.sendResetPasswordEmail(email, token);

    return {
      message: PASSWORD_RESET_EMAIL_SENT,
    };
  }

  @Post('reset')
  @ApiOperation({ summary: 'Reset password using token' })
  @ApiBody({ type: ResetPasswordBodyDto })
  @ApiOkResponse({
    description: PASSWORD_RESET_SUCCESSFUL,
    schema: { example: { message: PASSWORD_RESET_SUCCESSFUL } },
  })
  async resetPassword(
    @Body() { email, token, newPassword }: ResetPasswordBodyDto,
  ): Promise<{ message: string }> {
    await this.passwordResetService.validateAndConsumeToken(email, token);

    await this.authService.changePassword(email, newPassword);

    return { message: PASSWORD_RESET_SUCCESSFUL };
  }
}
