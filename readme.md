
# Payment app

A brief description of what this project does and who it's for


## Features

- Deposit
- Withdrawal
- Payment
- Transaction History


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Third Party Folder
`PORT`
`DB_HOST`
`DB_USER`
`DB_PASSWORD`
`DB_NAME`
`DB_DIALECT`

### Backend Folder
`PORT`
`FULL_NAME`
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

![Swagger Documentation](https://i.ibb.co.com/y582tH4/Screenshot-2024-05-20-015359.png)

#### Deposit

```http
  POST /deposit
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `order_id` | `string` | **Required** |
| `amount`   | `double` | **Required** |
| `timestamp` | `timsestamp` | **Required** |

#### Deposit Response
![Deposit](https://i.ibb.co.com/3MfZxMq/Screenshot-2024-05-20-020833.png)

#### Withdrawal

```http
  POST /withdrawal
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `order_id` | `string` | **Required** |
| `amount`   | `double` | **Required** |
| `timestamp` | `timsestamp` | **Required** |

#### Withdrawal Response
![Withdrawal](https://i.ibb.co.com/StCfZ6P/Screenshot-2024-05-20-022258.png)

#### Payment

```http
  POST /payment
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `order_id` | `string` | **Required** |
| `amount`   | `double` | **Required** |
| `timestamp` | `timsestamp` | **Required** |

#### Payment Response
![Payment](https://i.ibb.co.com/4YWLxnt/Screenshot-2024-05-20-022804.png)

#### History

```http
  GET /history
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id` | `integer` | **Required** |

#### History Response
![History](https://i.ibb.co.com/tMmTmBp/Screenshot-2024-05-20-023049.png)



## Page Screenshots

### Dashboard
![Dashboard](https://i.ibb.co.com/ZNQFwpF/Screenshot-2024-05-20-015710.png)

### Deposit Page
![Deposit](https://i.ibb.co.com/wC4QNgq/Screenshot-2024-05-20-015953.png)

### Withdraw Page
![Withdraw](https://i.ibb.co.com/3cHrtVq/Screenshot-2024-05-20-020128.png)

### Payment Page
![Payment](https://i.ibb.co.com/j3HqwbS/Screenshot-2024-05-20-145322.png)
![Payment Modal](https://i.ibb.co.com/F4m5GH6/Screenshot-2024-05-20-145545.png)

### Transaction History Page
![Transaction](https://i.ibb.co.com/FgHNFFn/Screenshot-2024-05-20-020439.png)


## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express

