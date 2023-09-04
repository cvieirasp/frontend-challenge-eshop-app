const faker = require('faker');

const TOTAL_PAGES = 5;

const baseProducts = [
  { name: 'Anjos e demônios', description: faker.lorem.paragraph(), image_url: 'https://m.media-amazon.com/images/I/41zzqil4SEL.jpg', category: 'books' },
  { name: 'O Código Da Vinci', description: faker.lorem.paragraph(), image_url: 'https://m.media-amazon.com/images/P/B00A3CR0AI.01._SCLZZZZZZZ_SX500_.jpg', category: 'books' },
  { name: 'O Símbolo Perdido', description: faker.lorem.paragraph(), image_url: 'https://m.media-amazon.com/images/I/51sS5F2dznL.jpg', category: 'books' },
  { name: 'Inferno', description: faker.lorem.paragraph(), image_url: 'https://m.media-amazon.com/images/I/61M8rKb+-3L.jpg', category: 'books' },
  { name: 'Origem', description: faker.lorem.paragraph(), image_url: 'https://m.media-amazon.com/images/P/B073FYB4KJ.01._SCLZZZZZZZ_SX500_.jpg', category: 'books' },
  { name: 'Ponto de Impacto', description: faker.lorem.paragraph(), image_url: 'https://m.media-amazon.com/images/P/B00A3D9K28.01._SCLZZZZZZZ_SX500_.jpg', category: 'books' },
  { name: 'PlayStation 5', description: faker.lorem.paragraph(), image_url: 'https://m.media-amazon.com/images/I/51+qnZm7V7L._AC_SL1000_.jpg', category: 'games' },
  { name: 'Xbox Series X', description: faker.lorem.paragraph(), image_url: 'https://m.media-amazon.com/images/I/51rsXDAfI-L._AC_SL1200_.jpg', category: 'games' },
  { name: 'Nintendo Switch', description: faker.lorem.paragraph(), image_url: 'https://m.media-amazon.com/images/I/61Uya8nseoL._AC_SL1500_.jpg', category: 'games' },
  { name: 'Controle DualSense - Branco', description: faker.lorem.paragraph(), image_url: 'https://m.media-amazon.com/images/I/51mft2+JpsL._AC_SL1000_.jpg', category: 'games' },
  { name: 'Controle sem Fio Xbox - Robot Branco', description: faker.lorem.paragraph(), image_url: 'https://m.media-amazon.com/images/I/71nsK2sqVvL._AC_SL1500_.jpg', category: 'games' },
  { name: 'Extreme Simracing Cockpit XT Premium', description: faker.lorem.paragraph(), image_url: 'https://m.media-amazon.com/images/I/71d4LSBkH-L._AC_SL1500_.jpg', category: 'games' },
]

const allProducts = new Array(TOTAL_PAGES).fill(1).reduce((acc) => {
  const products = baseProducts.map(product => ({
    ...product, 
    id: faker.datatype.uuid(),
    price_in_cents: faker.datatype.number({
      min: 20000,
      max: 100000,
    }),
    sales: faker.datatype.number(40),
    created_at: faker.date.past()
  })).sort(() => .5 - Math.random());

  return [...acc, ...products]
}, [])

module.exports = {
  products: allProducts
}
