import { getIntTransformWithDefault } from '@shared/utils';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export enum ResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

/**
 * DTO for paginated result.
 * @template T - The type of items in the paginated result.
 */
export class PaginationResultDto<T> {
  status: ResponseStatus;
  total: number;
  page: {
    index: number;
    size: number;
    items: T[];
  };
}

/**
 * DTO for pagination query parameters.
 */
export class PaginationQueryDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  @Transform(getIntTransformWithDefault(1))
  page: number = 1;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Transform(getIntTransformWithDefault(10))
  size: number = 10;
}
