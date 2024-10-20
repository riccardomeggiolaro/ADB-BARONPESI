import type { CustomDecorator } from '@nestjs/common';

import { IS_PUBLIC_KEY } from '@core/constants';
import { SetMetadata } from '@nestjs/common';

export const Public = (): CustomDecorator => SetMetadata(IS_PUBLIC_KEY, true);
