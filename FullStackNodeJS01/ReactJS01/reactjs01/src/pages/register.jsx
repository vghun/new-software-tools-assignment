import React from 'react';
import { Button, Col, Divider, Form, Input, notification, Row } from 'antd';
import { registerApi } from '../util/api'; // chắc chắn import đúng
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { name, email, password } = values;
    try {
      const res = await registerApi(name, email, password); // dùng registerApi
      notification.success({
        message: "Đăng ký thành công",
        description: res.message || "OTP đã được gửi, vui lòng xác nhận",
      });
      // Chuyển sang trang xác thực OTP nếu muốn
      navigate("/verify-otp"); 
    } catch (err) {
      notification.error({
        message: "Đăng ký thất bại",
        description: err.error || err.message || "Có lỗi xảy ra",
      });
    }
  };

  return (
    <Row justify="center" style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset style={{
          padding: "15px",
          margin: "5px",
          border: "1px solid #ccc",
          borderRadius: "5px"
        }}>
          <legend>Đăng ký Tài Khoản</legend>
          <Form name="register" onFinish={onFinish} autoComplete="off" layout="vertical">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>

          <Link to="/"><ArrowLeftOutlined /> Quay lại trang chủ</Link>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default RegisterPage;
