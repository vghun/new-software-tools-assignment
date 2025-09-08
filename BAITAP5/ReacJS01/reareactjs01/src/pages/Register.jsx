import { Form, Input, Button, Card, message } from "antd";
import axios from "axios";

export default function Register() {
  const onFinish = async (values) => {
    try {
      await axios.post("http://localhost:8888/api/register", values);
      message.success("Register success!");
    } catch (err) {
      message.error("Register failed: " + err.response.data.error);
    }
  };

  return (
    <Card title="Register" style={{ maxWidth: 400, margin: "50px auto" }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="username" label="Username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Register
        </Button>
      </Form>
    </Card>
  );
}
