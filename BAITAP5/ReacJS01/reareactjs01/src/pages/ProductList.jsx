import { useEffect, useState } from "react";
import { Card, Row, Col, Select, Spin, List } from "antd";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const { Option } = Select;

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const pageSize = 6;

  // Lấy danh mục
  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:8888/api/categories");
    setCategories(res.data);
  };

  // Lấy sản phẩm
  const fetchProducts = async (reset = false) => {
    setLoading(true);
    const res = await axios.get("http://localhost:8888/api/products", {
      params: { categoryId, page, limit: pageSize },
    });

    if (reset) {
      setProducts(res.data.products);
    } else {
      setProducts((prev) => [...prev, ...res.data.products]);
    }

    // Nếu số sản phẩm đã load >= tổng => hết dữ liệu
    if (products.length + res.data.products.length >= res.data.total) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }

    setLoading(false);
  };

  // Load danh mục ban đầu
  useEffect(() => {
    fetchCategories();
  }, []);

  // Khi đổi danh mục thì reset sản phẩm
  useEffect(() => {
    setPage(1);
    fetchProducts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  // Load thêm sản phẩm khi page thay đổi (scroll xuống cuối)
  useEffect(() => {
    if (page > 1) {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Danh sách sản phẩm</h2>

      <Select
        placeholder="Chọn danh mục"
        style={{ width: 220, marginBottom: 24 }}
        onChange={(value) => {
          setCategoryId(value);
        }}
        allowClear
      >
        {categories.map((cat) => (
          <Option key={cat._id} value={cat._id}>
            {cat.name}
          </Option>
        ))}
      </Select>

      <InfiniteScroll
        dataLength={products.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        loader={<Spin style={{ display: "block", margin: "20px auto" }} />}
        endMessage={<p style={{ textAlign: "center" }}>Đã tải hết sản phẩm 🎉</p>}
      >
        <Row gutter={[16, 16]}>
          {products.map((p) => (
            <Col xs={24} sm={12} md={8} key={p._id}>
              <Card
                cover={
                  <img
                    alt={p.name}
                    src={p.image}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                }
                hoverable
              >
                <Card.Meta title={p.name} description={`Giá: $${p.price}`} />
              </Card>
            </Col>
          ))}
        </Row>
      </InfiniteScroll>

      {loading && <Spin style={{ display: "block", margin: "20px auto" }} />}
    </div>
  );
}
