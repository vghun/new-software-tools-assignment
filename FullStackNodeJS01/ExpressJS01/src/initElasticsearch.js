// src/initElasticsearch.js
import esClient from "./config/elasticsearch.js";
import db from "./models/index.js"; // MySQL

async function init() {
  const indexExists = await esClient.indices.exists({ index: "products" });
  if (!indexExists) {
    await esClient.indices.create({ index: "products" });
    console.log("Index 'products' đã được tạo");
  } else {
    console.log("Index 'products' đã tồn tại");
  }

  const products = await db.Product.findAll();
  for (const p of products) {
    await esClient.index({
      index: "products",
      id: p.id.toString(),
      document: p.toJSON(),
    });
  }

  console.log("Tất cả sản phẩm đã được index vào Elasticsearch!");
  process.exit(0);
}

init().catch(console.error);
