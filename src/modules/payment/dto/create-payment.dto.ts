import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  @Min(1)
  amount!: number; // in smallest currency unit

  @IsString()
  currency!: string; // e.g. 'usd'

  @IsOptional()
  @IsString()
  description?: string;
}

