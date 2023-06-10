import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/repository/ProductRepository';
import { SalesRepository } from 'src/repository/SalesRepository';
import { SalesLimitRepository } from 'src/repository/SalesLimitRepository';
import { firstValueFrom } from 'rxjs';
import { TicketRepository } from 'src/repository/TicketRepository';
import { Ticket } from 'src/entity/Ticket';

export const TICKET_API = 'https://www.ticket.com/sell';

@Injectable()
export class TickertService {
  constructor(
    @Inject('ProductRepository') private productRepository: ProductRepository,
    @Inject('SalesRepository') private salesRepository: SalesRepository,
    @Inject('SalesLimitRepository') private salesLimitRepository: SalesLimitRepository,
    @Inject('TicketRepository') private ticketRepository: TicketRepository,
    private httpService: HttpService,
  ) {}

  async sellTicket(userId: number, productId: number, eventId: number, seat: string, value: number): Promise<void> {
    const product = await this.productRepository.findById(productId);
    if (product == null) {
      throw new Error('Product not found');
    }

    if (!product.enable) {
      throw new Error('Product not enabled');
    }

    const date = new Date();
    const salesLimit = await this.salesLimitRepository.findByUserId(userId);
    const sale = await this.salesRepository.findByUserIdAndDate(userId, date);

    sale.increase(value);

    if (salesLimit > 0 && sale.amount > salesLimit) {
      throw new Error('The user have exceeded the sales limit.');
    }

    const request: TicketRequest = {
      eventId,
      seat,
      date,
      value,
    };

    const response = await firstValueFrom(this.httpService.post<TicketReponse>(TICKET_API, request));

    const ticket = new Ticket();
    ticket.userId = userId;
    ticket.eventId = eventId;
    ticket.seat = seat;
    ticket.date = date;
    ticket.value = value;
    ticket.providerId = response.data.providerId;

    await this.salesRepository.save(sale);
    await this.ticketRepository.save(ticket);
  }
}

type TicketRequest = {
  eventId: number;
  date: Date;
  seat: string;
  value: number;
};

type TicketReponse = {
  providerId: number;
};
