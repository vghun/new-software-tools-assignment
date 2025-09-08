import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LoginOutlined,
  FormOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import ProductList from "./pages/ProductList";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Header */}
        <Header
          style={{
            position: "fixed",
            zIndex: 1000,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              marginRight: 40,
            }}
          >
            🛒 MyShop
          </div>
          <Menu theme="dark" mode="horizontal" selectable={false} style={{ flex: 1 }}>
            <Menu.Item key="1" icon={<AppstoreOutlined />}>
              <a href="/products">Products</a>
            </Menu.Item>
            <Menu.Item key="2" icon={<LoginOutlined />}>
              <a href="/login">Login</a>
            </Menu.Item>
            <Menu.Item key="3" icon={<FormOutlined />}>
              <a href="/register">Register</a>
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              <a href="/account">Account</a>
            </Menu.Item>
          </Menu>
        </Header>

        {/* Content */}
        <Content
          style={{
            marginTop: 64, // đẩy xuống dưới header
            padding: "24px",
            background: "#f5f5f5",
            minHeight: "calc(100vh - 134px)", // trừ header + footer
          }}
        >
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: "center" }}>
          Fullstack Demo ©2025 Created with Ant Design
        </Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
