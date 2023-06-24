# Singleton Pattern

## Refactoring Money Transfer Microservice

You have been given a microservice that enables money transfer between two accounts. The current implementation lacks
proper code organization and separation of concerns. Your task is to refactor the code by introducing three layers:
controller, service, and repository. Additionally, you should implement the singleton pattern for both the service and
repository, instead of relying on NestJS dependency injection.

## Request

You can run this command in your command line interface to execute the transfer request using curl. Make sure that your
server is running on port 3000, and adjust the URL accordingly based on your specific setup.

```
curl -i -X POST -H "Content-Type: application/json" -d '{
  "fromAccount": "A1234",
  "toAccount": "B1234",
  "amount": 100.00
}' http://localhost:3000/transfer
```