import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  // Placeholder that stores a record. Integrate Stripe or others as needed.
  async create(dto: CreatePaymentDto, userId?: string) {
    const payment = await this.prisma.payment.create({
      data: {
        amount: dto.amount,
        currency: dto.currency,
        description: dto.description ?? null,
        status: 'created',
        userId: userId ?? null,
      },
    });
    return payment;
  }

  findAll() {
    return this.prisma.payment.findMany({ orderBy: { createdAt: 'desc' } });
  }
}

