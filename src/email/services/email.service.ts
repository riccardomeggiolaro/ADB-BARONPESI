import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { generateFullWebLink } from '@shared/utils/url.utils';
import { isDefined } from 'class-validator';
import { DateTime } from 'luxon';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class EmailService {
  private readonly defaultLanguage: string = this.configService.get<string>(
    'i18n.fallback',
    'en',
  );
  private readonly baseUrl: string =
    this.configService.getOrThrow<string>('app.baseUrl');

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
  ) {}

  private getCurrentLanguage(): string {
    const context: I18nContext | undefined = I18nContext.current();

    return isDefined(context) ? context.lang : this.defaultLanguage;
  }

  private getCommonEmailContext(lang: string): Record<string, string> {
    return this.i18n.t('email.common', { lang });
  }

  private createEmailContext(
    templateKey: string,
    args: Record<string, unknown> = {},
  ): Record<string, string> {
    const lang: string = this.getCurrentLanguage();

    return {
      ...this.getCommonEmailContext(lang),
      ...this.i18n.t(templateKey, {
        lang,
        args: { ...args, year: DateTime.now().year },
      }),
      lang,
    };
  }

  private generateResetPasswordLink(token: string): string {
    return generateFullWebLink(this.baseUrl, ['auth', 'reset-password', token]);
  }

  async sendResetPasswordEmail(
    email: string,
    resetToken: string,
  ): Promise<void> {
    const lang: string = this.getCurrentLanguage();
    const context: Record<string, string> = this.createEmailContext(
      'email.resetPassword',
      { email },
    );

    await this.mailerService.sendMail({
      to: email,
      subject: this.i18n.t('email.resetPassword.subject', { lang }),
      template: './reset-password',
      context: {
        ...context,
        resetPasswordLink: this.generateResetPasswordLink(resetToken),
      },
    });
  }
}
