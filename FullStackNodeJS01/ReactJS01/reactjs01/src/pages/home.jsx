import { useEffect, useState, useRef, useCallback } from "react";
import { List, Card, Spin, Select, Input } from "antd";
import { getProductsApi, getCategoriesApi, searchProductsApi } from "../util/product.api";

const { Option } = Select;

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // null = Tất cả
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 8;

  const loaderRef = useRef(null);

  // Lấy danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategoriesApi();
      if (res && res.length > 0) {
        setCategories(res);
      }
    };
    fetchCategories();
  }, []);

  // Load sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let res;
        if (searchQuery.trim()) {
          // Search ưu tiên trước
          res = await searchProductsApi(searchQuery, page, limit);
          const data = res.products || [];
          setHasMore(data.length === limit);
          setProducts(prev => page === 1 ? data : [...prev, ...data]);
        } else {
          // selectedCategory = null => lấy tất cả sản phẩm
          res = await getProductsApi(page, limit, selectedCategory);
          const data = res.data || [];
          setHasMore(data.length === limit);
          setProducts(prev => page === 1 ? data : [...prev, ...data]);
        }
      } catch (err) {
        console.error("Lỗi lấy sản phẩm:", err);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [page, selectedCategory, searchQuery]);

  // Reset khi đổi category hoặc search
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [selectedCategory, searchQuery]);

  // IntersectionObserver để load thêm khi scroll
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && hasMore) {
        setPage(prev => prev + 1);
      }
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const option = { root: null, rootMargin: "20px", threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 16 }}>Tìm kiếm & Danh mục sản phẩm</h2>

      {/* Input search */}
      <Input.Search
        placeholder="Nhập từ khóa tìm kiếm..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSearch={() => setPage(1)}
        enterButton
        style={{ marginBottom: 16, width: 400 }}
      />

      {/* Select category */}
      <Select
        value={selectedCategory ?? ""}
        style={{ width: 200, marginBottom: 20, marginLeft: 20 }}
        onChange={(value) => setSelectedCategory(value || null)}
      >
        <Option value="">Tất cả</Option>
        {categories.map(c => (
          <Option key={c.id} value={c.id}>
            {c.name}
          </Option>
        ))}
      </Select>

      {/* List sản phẩm */}
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={products}
        renderItem={item => (
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

      {/* Loader / message hết sản phẩm */}
      <div ref={loaderRef} style={{ textAlign: "center", margin: "20px 0" }}>
        {loading && <Spin />}
        {!hasMore && <p>Đã tải hết sản phẩm 🎉</p>}
      </div>
    </div>
  );
};

export default HomePage;
