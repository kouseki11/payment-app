const transactionService = require("../services/transactionService");

const deposit = async (req, res) => {
  const { amount } = req.body;
  const user = req.user;
  const userToken = user;
  const createdAt = new Date();

  try {
    const result = await transactionService.createDeposit(
      amount,
      createdAt,
      user,
      userToken
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const payment = async (req, res) => {
  const { order_id, amount, type } = req.body;
  const user = req.user;
  const userToken = user;
  const createdAt = new Date();

  try {
    const result = await transactionService.createPayment(
      order_id,
      amount,
      type,
      createdAt,
      user,
      userToken
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const withdraw = async (req, res) => {
  const { order_id, amount, type } = req.body;
  const user = req.user;
  const userToken = user;
  const { user_id } = user;
  const createdAt = new Date();

  try {
    const result = await transactionService.createWithdrawal(
      order_id,
      amount,
      createdAt,
      type,
      user,
      userToken
    );
    console.log(user_id)
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const history = async (req, res) => {
  try {
    const user = req.user;
    const userToken = user;
    const result = await transactionService.getTransactions(user, userToken);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const wallet = async (req, res) => {
  const user = req.user;
  const userToken = user;
  const result = await transactionService.getWallet(user, userToken);
  res.status(200).json(result);
};

module.exports = { deposit, withdraw, history, payment, wallet };
