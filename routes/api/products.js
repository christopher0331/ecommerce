const express = require('express');
const router = express.Router();

// Temporary product data (replace with database in production)
let products = [
  { id: 1, name: 'Product 1', price: 19.99, description: 'Description for Product 1' },
  { id: 2, name: 'Product 2', price: 29.99, description: 'Description for Product 2' },
  { id: 3, name: 'Product 3', price: 39.99, description: 'Description for Product 3' },
];

// GET all products
router.get('/', (req, res) => {
  res.json(products);
});

// GET a single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST a new product
router.post('/', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT (update) a product
router.put('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  
  product.name = req.body.name || product.name;
  product.price = req.body.price || product.price;
  product.description = req.body.description || product.description;
  
  res.json(product);
});

// DELETE a product
router.delete('/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).json({ message: 'Product not found' });
  
  products.splice(productIndex, 1);
  res.json({ message: 'Product deleted' });
});

module.exports = router;
