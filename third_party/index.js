require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const transactionController = require("./controllers/transactionController");
const checkTokenMiddleware = require("./middlewares/checkToken.");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3001', 
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));


app.post("/deposits", checkTokenMiddleware, transactionController.deposit);
app.post("/withdrawals", checkTokenMiddleware, transactionController.withdraw);
app.get("/histories", checkTokenMiddleware, transactionController.history);
app.post("/payments", checkTokenMiddleware, transactionController.payment);
app.get("/wallet", checkTokenMiddleware, transactionController.wallet);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
