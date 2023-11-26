import { Dropdown, Layout, Menu, Space } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Header style={{ display: "flex", justifyContent: "space-between" }}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={[
          {
            key: "1",
            label: "Home",
          },
        ]}
      />
      <Dropdown
        menu={{
          items: [
            {
              label: "Logout",
              key: "3",
              onClick: () => {
                signOut(auth)
                  .then(() => {
                    navigate("/");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              },
            },
          ],
        }}
        trigger={["click"]}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>Rivo Rizaldi</Space>
        </a>
      </Dropdown>
    </Header>
  );
};

export default Navbar;
