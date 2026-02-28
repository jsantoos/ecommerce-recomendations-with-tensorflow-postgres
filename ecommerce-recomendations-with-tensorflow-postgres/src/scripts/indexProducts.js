const { Client } = require("pg");
const tf = require("@tensorflow/tfjs-node");
const model = require("../model"); // ajuste conforme estrutura

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "ecommerce",
  password: "ecommerce",
  database: "ecommerce"
});

async function indexProducts(products) {
  await client.connect();

  for (const product of products) {
    const embedding = await model.getProductEmbedding(product);

    await client.query(
      "INSERT INTO product_embeddings (product_id, embedding) VALUES ($1, $2) ON CONFLICT (product_id) DO UPDATE SET embedding = $2",
      [product.id, embedding.arraySync()]
    );
  }

  await client.end();
}

module.exports = indexProducts;