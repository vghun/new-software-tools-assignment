import { Form, Input, Button, Card, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await axios.post("http://localhost:8888/api/login", values);
      localStorage.setItem("userId", res.data.user.id);
      message.success("Login success!");
      navigate("/account"); // ✅ tự động chuyển sang trang account
    } catch (err) {
      message.error("Login failed: " + err.response.data.error);
    }
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: "50px auto" }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="account" label="Username or Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form>
    </Card>
  );
}
