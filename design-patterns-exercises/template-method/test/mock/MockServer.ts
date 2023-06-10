import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { RECHARGE_API } from '../../src/service/MobileRechargeService';
import { TICKET_API } from '../../src/service/TicketService';

export const handlers = [
  rest.post(RECHARGE_API, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
      }),
    );
  }),

  rest.post(TICKET_API, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
      }),
    );
  }),
];

// This configures a request mocking server with the given request handlers.
export const mockServer = setupServer(...handlers);
