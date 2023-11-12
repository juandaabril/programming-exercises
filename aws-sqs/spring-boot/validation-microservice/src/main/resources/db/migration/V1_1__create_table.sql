DROP TABLE IF EXISTS transactions;

CREATE TABLE transactions (
    id UUID PRIMARY KEY,
    transaction_id UUID NOT NULL,
    transaction_date DATE NOT NULL,
    transaction_type VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    account_number VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    success BOOLEAN NOT NULL
);

