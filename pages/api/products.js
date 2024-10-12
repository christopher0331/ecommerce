import { faker } from '@faker-js/faker';

const flagTypes = [
  'American', 'Marine Corps', 'Army', 'Navy', 'Air Force', 'Coast Guard', 'Space Force',
  'POW/MIA', 'Gadsden', 'Betsy Ross', 'Thin Blue Line', 'Thin Red Line',
  'Don\'t Tread on Me', 'Come and Take It', 'State Flags', 'Historical American',
  'Jolly Roger', 'Molon Labe', 'First Navy Jack', 'Union Jack',
  'Bennington', 'Culpeper', 'Gonzales', 'Commodore Perry',
  'Bunker Hill', 'Pine Tree', 'Serapis', 'Taunton', 'Bedford',
  'Washington\'s Cruisers'
];

const materials = ['Steel', 'Aluminum', 'Copper', 'Brass', 'Bronze'];
const finishes = ['Brushed', 'Polished', 'Powder Coated', 'Patina', 'Raw'];

// Generate dummy product data
let products = flagTypes.map((type, index) => ({
  id: index + 1,
  name: `${faker.helpers.arrayElement(materials)} ${type} Flag`,
  price: parseFloat(faker.commerce.price(50, 500)),
  description: `Metal-fabricated ${type} flag. ${faker.helpers.arrayElement(finishes)} finish. Handcrafted by a former Marine.`,
  featured: index < 6, // First 6 products are featured
  image: faker.image.url({ width: 400, height: 400, category: 'abstract' }) // Using abstract for flag-like images
}));

export default function handler(req, res) {
  const { method, query } = req

  switch (method) {
    case 'GET':
      if (query.id) {
        const product = products.find(p => p.id === parseInt(query.id))
        if (product) {
          res.status(200).json(product)
        } else {
          res.status(404).json({ message: 'Flag not found' })
        }
      } else {
        let filteredProducts = products
        if (query.featured) {
          filteredProducts = products.filter(p => p.featured)
        }
        res.status(200).json(filteredProducts)
      }
      break
    case 'POST':
      const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        featured: req.body.featured || false,
        image: faker.image.url({ width: 400, height: 400, category: 'abstract' })
      };
      products.push(newProduct);
      res.status(201).json(newProduct);
      break
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
