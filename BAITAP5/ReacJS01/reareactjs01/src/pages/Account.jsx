import { Card, Descriptions, message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await axios.get("http://localhost:8888/api/account");
        setUser(res.data);
      } catch (err) {
        message.error("Please login first!");
      }
    };
    fetchAccount();
  }, []);

  return (
    <Card title="My Account" style={{ maxWidth: 600, margin: "50px auto" }}>
      {user ? (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID">{user._id}</Descriptions.Item>
          <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
        </Descriptions>
      ) : (
        <p>Loading...</p>
      )}
    </Card>
  );
}
