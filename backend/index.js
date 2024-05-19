require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const cors = require("cors");
app.use(bodyParser.json());

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const fullName = process.env.FULL_NAME;
const authorization = Buffer.from(fullName).toString('base64');

app.use(cors({
  origin: 'http://localhost:3001', 
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

const products = [
  { id: 1, name: 'Product 1', description: 'Description of Product 1', price: 100 },
  { id: 2, name: 'Product 2', description: 'Description of Product 2', price: 200 },
  { id: 3, name: 'Product 3', description: 'Description of Product 3', price: 300 },
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/payment', (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p.id === productId);
  if (product && wallet.balance >= product.price) {
    wallet.balance -= product.price;
    res.json({ message: 'Payment successful' });
  } else {
    res.status(400).json({ message: 'Payment failed' });
  }
});


app.post('/deposit', async (req, res) => {
  try {
    const { amount } = req.body;
    const response = await axios.post('http://localhost:3000/deposits', {
      amount,
    }, {
      headers: {
        authorization: `Bearer ${authorization}` 
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/withdrawal', async (req, res) => {
  try {
    const { amount } = req.body;
    const response = await axios.post('http://localhost:3000/withdrawals', {
      amount,
    }, {
      headers: {
        authorization: `Bearer ${authorization}` 
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/history', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/histories', {
      headers: {
        authorization: `Bearer ${authorization}` 
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/wallet', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/wallet', {
      headers: {
        authorization: `Bearer ${authorization}` 
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
