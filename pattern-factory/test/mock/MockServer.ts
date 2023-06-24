import { setupServer } from 'msw/node';
import { rest } from 'msw';
import {
  CREDIT_BANK_API,
  CREDIT_CARD_API,
  CREDIT_PAYPAL_PAY_API,
  CREDIT_PAYPAL_TOKEN_API,
} from '../../src/service/PaymentService';

export const handlers = [
  rest.post(CREDIT_CARD_API, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
      }),
    );
  }),

  rest.post(CREDIT_PAYPAL_TOKEN_API, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
      }),
    );
  }),

  rest.post(CREDIT_PAYPAL_PAY_API, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
      }),
    );
  }),

  rest.post(CREDIT_BANK_API, (req, res, ctx) => {
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
