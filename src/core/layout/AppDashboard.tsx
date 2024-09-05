import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdCategory, MdDashboard } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slice/userSlice";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <Link to={`/admin/${key}`}>{label}</Link>,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "", <MdDashboard />),
  getItem("Category Management", "category-management", <MdCategory />),
  getItem("Auction Management", "auction-management", <AiFillProduct />),
];

const AppDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state: RootState) => state.user);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleLogin = () => {
    dispatch(logout());
    navigate("/auth/login");
  };
  const itemsUser: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={"/u/profile"}>Thông tin</Link>,
    },
    {
      key: "2",
      label: <div onClick={handleLogin}>Đăng xuất</div>,
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ background: colorBgContainer }}>
          <div className="w-full h-full flex justify-end items-center gap-4">
            {userLogin && (
              <Dropdown
                menu={{ items: itemsUser }}
                placement="bottomLeft"
                arrow
                trigger={["click"]}
              >
                <div className="flex items-center gap-2 border border-gray-400 py-1 px-5 rounded-lg">
                  <Avatar size={"large"} />
                  <p className="text-sm font-bold">
                    {userLogin["fullName"]}
                  </p>{" "}
                </div>
              </Dropdown>
            )}
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppDashboard;
