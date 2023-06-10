import { Ticket } from '../entity/Ticket';

export interface TicketRepository {
  save(ticket: Ticket): Promise<Ticket>;
}
