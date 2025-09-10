import { useEffect, useState, useRef, useCallback } from "react";
import { List, Card, Spin, Select } from "antd";
import { getProductsApi, getCategoriesApi } from "../util/product.api";

const { Option } = Select;

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 8;

  const loaderRef = useRef(null); // ref tới "loading div"

  // Lấy danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategoriesApi();
      if (res && res.length > 0) {
        setCategories(res);
        setSelectedCategory(res[0].id); // chọn category đầu tiên
      }
    };
    fetchCategories();
  }, []);

  // Lấy sản phẩm (chỉ khi có category)
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getProductsApi(page, limit, selectedCategory);
        if (res.data.length === 0) {
          setHasMore(false);
        } else {
          setProducts((prev) =>
            page === 1 ? res.data : [...prev, ...res.data]
          );
        }
      } catch (err) {
        console.error("Lỗi lấy sản phẩm:", err);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [page, selectedCategory]);

  // Reset khi đổi category
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [selectedCategory]);

  // IntersectionObserver để tự động load khi scroll
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 16 }}>Danh mục sản phẩm</h2>
      <Select
        value={selectedCategory}
        style={{ width: 200, marginBottom: 20 }}
        onChange={(value) => setSelectedCategory(value)}
      >
        {categories.map((c) => (
          <Option key={c.id} value={c.id}>
            {c.name}
          </Option>
        ))}
      </Select>

      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={products}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.name}>
              <p>{item.description}</p>
              <p style={{ color: "red", fontWeight: "bold" }}>
                {item.price.toLocaleString()} đ
              </p>
              <p style={{ fontSize: 12, color: "gray" }}>
                {item.Category?.name}
              </p>
            </Card>
          </List.Item>
        )}
      />

      {/* Loader (hiện khi đang tải) */}
      <div
        ref={loaderRef}
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        {loading && <Spin />}
        {!hasMore && <p>Đã tải hết sản phẩm 🎉</p>}
      </div>
    </div>
  );
};

export default HomePage;
