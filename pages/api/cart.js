let cart = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(cart);
  } else if (req.method === 'POST') {
    const { productId, quantity } = req.body;
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    res.status(201).json(cart);
  } else if (req.method === 'PUT') {
    const { productId } = req.query;
    const { quantity } = req.body;
    const item = cart.find(item => item.productId === parseInt(productId));

    if (!item) return res.status(404).json({ message: 'Item not found in cart' });

    item.quantity = quantity;
    res.status(200).json(cart);
  } else if (req.method === 'DELETE') {
    if (req.query.productId) {
      const { productId } = req.query;
      const itemIndex = cart.findIndex(item => item.productId === parseInt(productId));

      if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });

      cart.splice(itemIndex, 1);
      res.status(200).json(cart);
    } else {
      cart = [];
      res.status(200).json({ message: 'Cart cleared' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
