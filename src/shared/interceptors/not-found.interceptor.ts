/* eslint-disable @typescript-eslint/class-methods-use-this */
import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import type { Observable } from 'rxjs';

import { Injectable, NotFoundException } from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      tap((data: unknown) => {
        if (data === undefined) throw new NotFoundException();
      }),
    );
  }
}
