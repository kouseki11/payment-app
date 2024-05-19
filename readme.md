
# Payment app

A brief description of what this project does and who it's for


## Features

- Deposit
- Withdrawal
- Payment
- Transaction History


## Installation

Install payment-app with npm open 3 terminal
- First set-up your env

```bash
  cd third_party
  npm install
  npm run migrate
  npm run seed
  npm start
```
```bash
  cd backend
  npm install
  npm run swagger
  npm start
```
```bash
  cd frontend
  npm install
  npm run dev
```
    
## API Reference
```http
  http://localhost:3333/
```

#### Swagger Documentation
```http
  http://localhost:3333/api-docs/
```

#### Deposit

```http
  POST /api/deposit
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `order_id` | `string` | **Required** |
| `amount`   | `double` | **Required** |
| `timestamp` | `timsestamp` | **Required** |

#### Withdrawal

```http
  GET /api/withdraw
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `order_id` | `string` | **Required** |
| `amount`   | `double` | **Required** |
| `timestamp` | `timsestamp` | **Required** |



## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

