const { or, where } = require("sequelize");
const db = require("../models/index");

const createDeposit = async ( amount, createdAt, user, userToken) => {
  const t = await db.sequelize.transaction();
  try {
    const status = 1;

    if (amount <= 0) {
      return { status: 2, error: "Insufficient balance" };
    }

    const latestTransaction = await db.Transaction.findOne({
      order: [['createdAt', 'DESC']],
      limit: 1,
      attributes: ['order_id'],
      where: { user_id: userToken.id, type: "Deposit" },
      transaction: t
    });

    let newOrderId;
    if (latestTransaction && latestTransaction.order_id) {
      const latestOrderIdNumber = parseInt(latestTransaction.order_id.split('-')[1], 10);
      const newOrderIdNumber = latestOrderIdNumber + 1;
      newOrderId = `DP-${newOrderIdNumber.toString().padStart(3, '0')}`;
    } else {
      newOrderId = `DP-${userToken.id}001`;
    }

    const order_id = newOrderId;

    await db.Transaction.create(
      {
        order_id,
        amount,
        user_id: userToken.id,
        createdAt,
        status,
        type: "Deposit",
      },
      { transaction: t }
    );

    await db.Wallet.update(
      { balance: db.sequelize.literal(`balance + ${amount}`) },
      { where: { user_id: userToken.id } },
      { transaction: t }
    );
    await t.commit();
    return { order_id, amount, status };
  } catch (error) {
    console.log(error);
    await t.rollback();
    return { status: 2, error: "Failed to process deposit" };
  }
};

const createPayment = async (
  order_id,
  amount,
  createdAt,
  user,
  userToken,
  type
) => {
  const t = await db.sequelize.transaction();
  try {
    const status = 1;

    const lastAmount = await db.Wallet.findOne({
      where: { user_id: userToken.id },
      attributes: ['balance'],
      transaction: t
    });
    const balance = lastAmount.balance;
    
    if (parseInt(balance) < amount || amount <= 0) {
      return { status: 2, error: "Insufficient balance" };
    }

    const latestTransaction = await db.Transaction.findOne({
      order: [['createdAt', 'DESC']],
      limit: 1,
      attributes: ['order_id'],
      where: { user_id: userToken.id, type: "Payment" },
      transaction: t
    });

    let newOrderId;
    if (latestTransaction && latestTransaction.order_id) {
      const latestOrderIdNumber = parseInt(latestTransaction.order_id.split('-')[1], 10);
      const newOrderIdNumber = latestOrderIdNumber + 1;
      newOrderId = `PAY-${newOrderIdNumber.toString().padStart(3, '0')}`;
    } else {
      newOrderId = `PAY-${userToken.id}001`;
    }

    const order_id = newOrderId;
    
    await db.Transaction.create(
      {
        order_id,
        amount,
        user_id: userToken.id,
        createdAt,
        status,
        type: "Payment",
      },
      { transaction: t }
    );

    await db.Wallet.update(
      { balance: db.sequelize.literal(`balance - ${amount}`) },
      { where: { user_id: userToken.id } },
      { transaction: t }
    );
    await t.commit();
    return { order_id, amount, status };
  } catch (error) {
    console.log(error);
    await t.rollback();
    throw new Error("Failed to process payment");
  }
};

const createWithdrawal = async (
  order_id,
  amount,
  createdAt,
  user,
  userToken,
  type
) => {
  const t = await db.sequelize.transaction();
  try {
    const status = 1;

    const lastAmount = await db.Wallet.findOne({
      where: { user_id: userToken.id },
      attributes: ['balance'],
      transaction: t
    });
    const balance = lastAmount.balance;
    
    if (parseInt(balance) < amount || amount <= 0) {
      return { status: 2, error: "Insufficient balance" };
    }

    const latestTransaction = await db.Transaction.findOne({
      order: [['createdAt', 'DESC']],
      limit: 1,
      attributes: ['order_id'],
      where: { user_id: userToken.id, type: "Withdrawal" },
      transaction: t
    });

    let newOrderId;
    if (latestTransaction && latestTransaction.order_id) {
      const latestOrderIdNumber = parseInt(latestTransaction.order_id.split('-')[1], 10);
      const newOrderIdNumber = latestOrderIdNumber + 1;
      newOrderId = `WD-${newOrderIdNumber.toString().padStart(3, '0')}`;
    } else {
      newOrderId = `WD-${userToken.id}001`;
    }

    const order_id = newOrderId;

    await db.Transaction.create({
      order_id,
      amount,
      createdAt,
      user_id: userToken.id,
      status,
      type: "Withdrawal",
    }, { transaction: t });
    await db.Wallet.update(
      { balance: db.sequelize.literal(`balance - ${amount}`) },
      { where: { user_id: userToken.id } },
      { transaction: t }
    );

    await t.commit();
    return { order_id, amount, status };
  } catch (error) {
    console.log(error);
    await t.rollback();
    return { status: 2, error: "Failed to process withdrawal" };
  }
};

const getTransactions = async (user, userToken) => {
  try {
    const transactions = await db.Transaction.findAll({
      where: { user_id: userToken.id },
      order: [["createdAt", "DESC"]],
    });
    return transactions;
  } catch (error) {
    throw new Error("Failed to fetch transactions");
  }
};

const getWallet = async (user, userToken) => {
  try {
    const wallet = await db.Wallet.findAll({
      where: { user_id: userToken.id },
      include: [{
        model: db.User,
        as: 'user',
        attributes: ['name']
      }],
    });
    return wallet;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch wallet");
  }
};

module.exports = {
  createDeposit,
  createWithdrawal,
  getTransactions,
  createPayment,
  getWallet,
};
