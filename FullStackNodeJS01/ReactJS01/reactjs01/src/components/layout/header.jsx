import React, { useContext, useState } from 'react';
import { UsergroupAddOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  const items = [
    {
      label: <Link to="/">Home Page</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    ...(auth.isAuthenticated ? [{
      label: <Link to="/user">Users</Link>,
      key: 'user',
      icon: <UsergroupAddOutlined />,
    }] : []),
    {
      label: `Welcome ${auth?.user?.email ?? ""}`,
      key: 'subMenu',
      icon: <SettingOutlined />,
      children: [
        ...(auth.isAuthenticated ? [{
          label: <span onClick={() => {
            setAuth({
              isAuthenticated: false,
              user: {
                email: "",
                name: ""
              }
            });
            localStorage.clear("access_token");
            navigate("/");
          }}>Đăng xuất</span>,
          key: 'logout',
        }] : [{
          label: <Link to="/login">Đăng nhập</Link>,
          key: 'login',
        }]),
      ]
    }
  ];

  const [current, setCurrent] = useState('home');
  const onClick = (e) => {
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Header;
