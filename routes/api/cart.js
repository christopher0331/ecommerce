const express = require('express');
const router = express.Router();

// Temporary cart data (replace with database in production)
let cart = [];

// GET cart contents
router.get('/', (req, res) => {
  res.json(cart);
});

// POST add item to cart
router.post('/add', (req, res) => {
  const { productId, quantity } = req.body;
  const existingItem = cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  res.status(201).json(cart);
});

// PUT update cart item quantity
router.put('/update/:productId', (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const item = cart.find(item => item.productId === parseInt(productId));

  if (!item) return res.status(404).json({ message: 'Item not found in cart' });

  item.quantity = quantity;
  res.json(cart);
});

// DELETE remove item from cart
router.delete('/remove/:productId', (req, res) => {
  const { productId } = req.params;
  const itemIndex = cart.findIndex(item => item.productId === parseInt(productId));

  if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });

  cart.splice(itemIndex, 1);
  res.json(cart);
});

// DELETE clear cart
router.delete('/clear', (req, res) => {
  cart = [];
  res.json({ message: 'Cart cleared' });
});

module.exports = router;
