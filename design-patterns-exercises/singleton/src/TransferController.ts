import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { Database } from 'sqlite3';

const db = new Database('db.sqlite');

db.serialize(async () => {
  await new Promise<void>((resolve, reject) => {
    db.run(`DROP TABLE IF EXISTS accounts;`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  await new Promise<void>((resolve, reject) => {
    db.run(
      `    CREATE TABLE accounts
                (
                  id             INTEGER PRIMARY KEY AUTOINCREMENT,
                  account_number VARCHAR(200),
                  balance        DECIMAL(10, 2)
                );`,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });

  await new Promise<void>((resolve, reject) => {
    db.run(
      `    INSERT INTO accounts
                VALUES (1, 'A1234', 1000),
                       (2, 'B1234', 2500),
                       (3, 'C1234', 600);`,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });
});

export class TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
}

type Account = {
  balance: number;
};

@Controller()
export class TransferController {
  @Post('/transfer')
  @HttpCode(200)
  async transfer(@Body() request: TransferRequest) {
    const { fromAccount, toAccount, amount } = request;

    if (!fromAccount || !toAccount || !amount) {
      throw new BadRequestException('Se requieren los campos fromAccount, toAccount y amount');
    }

    const fromRow: Account = await new Promise((resolve, reject) => {
      db.get('SELECT balance FROM accounts WHERE account_number = ?', [fromAccount], (err, row) => {
        if (err) {
          console.error(err);
          reject(new InternalServerErrorException('Error al consultar la cuenta'));
        } else {
          resolve(row as Account);
        }
      });
    });
    if (!fromRow) {
      throw new NotFoundException('Cuenta de origen no encontrada');
    }

    const toRow: Account = await new Promise((resolve, reject) => {
      db.get('SELECT balance FROM accounts WHERE account_number = ?', [toAccount], (err, row) => {
        if (err) {
          reject(new InternalServerErrorException('Error al consultar la cuenta'));
        } else {
          resolve(row as Account);
        }
      });
    });
    if (!toRow) {
      throw new NotFoundException('Cuenta de destino no encontrada');
    }

    const fromBalance = fromRow.balance;
    const toBalance = toRow.balance;

    if (fromBalance < amount) {
      throw new BadRequestException('Saldo insuficiente en la cuenta de origen');
    }

    const newFromBalance = fromBalance - amount;
    const newToBalance = toBalance + amount;

    await new Promise<void>((resolve, reject) => {
      db.run('UPDATE accounts SET balance = ? WHERE account_number = ?', [newFromBalance, fromAccount], (err) => {
        if (err) {
          reject(new InternalServerErrorException('Error al actualizar el saldo de la cuenta'));
        } else {
          resolve();
        }
      });
    });

    await new Promise<void>((resolve, reject) => {
      db.run('UPDATE accounts SET balance = ? WHERE account_number = ?', [newToBalance, toAccount], (err) => {
        if (err) {
          reject(new InternalServerErrorException('Error al actualizar el saldo de la cuenta'));
        } else {
          resolve();
        }
      });
    });
  }
}
