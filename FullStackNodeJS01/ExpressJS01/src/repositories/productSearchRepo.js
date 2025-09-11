import esClient from "../config/elasticsearch.js";

/**
 * Tìm kiếm sản phẩm bằng Elasticsearch (fuzzy search)
 */
export const searchProducts = async ({ q = "", page = 1, limit = 10 }) => {
  try {
    const from = (page - 1) * limit;

    // Kiểm tra index 'products' tồn tại
    const indexExists = await esClient.indices.exists({ index: "products" });
    if (!indexExists) {
      console.warn("Index 'products' chưa tồn tại");
      return { total: 0, products: [] };
    }

    const result = await esClient.search({
      index: "products",
      from,
      size: limit,
      query: {
        bool: {
          must: q
            ? [
                {
                  multi_match: {
                    query: q,
                    fields: ["name", "description"],
                    fuzziness: "AUTO",
                  },
                },
              ]
            : [],
        },
      },
    });

    return {
      total: result.hits.total.value,
      products: result.hits.hits.map((hit) => hit._source),
    };
  } catch (err) {
    console.error("Elasticsearch search error:", err.meta?.body || err);
    throw err;
  }
};

/**
 * Index một sản phẩm vào Elasticsearch
 */
export const indexProduct = async (product) => {
  try {
    return await esClient.index({
      index: "products",
      id: product.id.toString(),
      document: product,
    });
  } catch (err) {
    console.error("Elasticsearch index error:", err.meta?.body || err);
    throw err;
  }
};
