import { faker } from "@faker-js/faker";
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Layout,
  List,
  Row,
  Tooltip,
  theme,
} from "antd";
import { SearchProps } from "antd/es/input";
import { useState, useEffect } from "react";
import Modal, { FormData } from "../../components/Modal";
import Navbar from "../../components/Navbar";
import { data } from "../../json/fakeData.json";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Footer from "../../components/Footer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Search } = Input;

function Contacts() {
  const navigate = useNavigate();
  const [listContact, setListContact] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  const [modalData, setModalData] = useState({
    isOpen: false,
    data: { name: "", contactNumber: "", id: "" },
    type: "add",
  });

  const onChange: SearchProps["onChange"] = (value) => {
    setSearchValue(value.target.value);
  };

  const filterContact = listContact.filter((contact) => {
    const searchText = searchValue.trim().toLowerCase();
    return contact.name.toLowerCase().includes(searchText);
  });

  const showModal = () => {
    setModalData({
      data: { name: "", contactNumber: "", id: "" },
      type: "add",
      isOpen: true,
    });
  };

  const handleCancel = () => {
    setModalData({
      data: { name: "", contactNumber: "", id: "" },
      type: "add",
      isOpen: false,
    });
  };

  const onFinish = (data: FormData) => {
    switch (modalData.type) {
      case "add":
        setListContact([
          {
            name: data.name as string,
            contactNumber:
              data.contactNumber?.charAt(0) === "0"
                ? `${data.contactNumber.replace(/^0/, "+62")}`
                : `+62${data.contactNumber}`,
            id: faker.string.uuid(),
          },
          ...listContact,
        ]);

        setModalData({
          data: { name: "", contactNumber: "", id: "" },
          type: "add",
          isOpen: false,
        });
        break;
      case "edit":
        setListContact((prevContact) =>
          prevContact.map((contact) =>
            contact.id === (modalData.data! as FormData).id
              ? {
                  name: data.name as string,
                  id: (modalData.data! as FormData).id as string,
                  contactNumber: `+${data.contactNumber}`,
                }
              : contact
          )
        );

        setModalData({
          data: { name: "", contactNumber: "", id: "" },
          type: "edit",
          isOpen: false,
        });
        break;
      default:
        break;
    }
  };

  const handleEdit = (data: FormData) => {
    const removePlus = data.contactNumber!.split("+").join("");

    setModalData({
      data: {
        id: data.id as string,
        name: data.name as string,
        contactNumber: removePlus,
      },
      type: "edit",
      isOpen: true,
    });
  };

  const handleDelete = (data: FormData) => {
    const filter = listContact.filter((contact) => contact.id !== data.id);

    setListContact(filter);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);

  return (
    <>
      <Layout className="layout">
        <Navbar />
        <Content style={{ height: "calc(100vh - 130.4px)", padding: 16 }}>
          <div style={{ background: colorBgContainer, padding: 16 }}>
            <Row justify={"space-between"}>
              <Col>
                <Search
                  allowClear
                  value={searchValue}
                  onChange={onChange}
                  placeholder="search contact name"
                  style={{ width: 200 }}
                />
              </Col>
              <Col>
                <Button onClick={showModal}>Tambah Data</Button>
              </Col>
            </Row>

            <Divider />

            <List
              pagination={{
                position: "bottom",
                align: "end",
                pageSize: 18,
                total: listContact.length,
                showSizeChanger: false,
                showTotal: (total) => `Total ${total} items`,
              }}
              grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
              dataSource={filterContact}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    title={item.name}
                    extra={
                      <>
                        <Tooltip title="edit">
                          <Button
                            onClick={() => {
                              handleEdit(item);
                            }}
                            type="text"
                            icon={<EditOutlined />}
                          />
                        </Tooltip>
                        <Tooltip title="hapus">
                          <Button
                            onClick={() => {
                              handleDelete(item);
                            }}
                            type="text"
                            icon={<DeleteOutlined />}
                          />
                        </Tooltip>
                      </>
                    }
                  >
                    {item.contactNumber}
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </Content>

        <Footer />
      </Layout>

      {modalData.isOpen && (
        <Modal
          type={modalData.type}
          isModalOpen={modalData.isOpen}
          handleCancel={handleCancel}
          onSubmit={onFinish}
          data={modalData.data}
        />
      )}
    </>
  );
}

export default Contacts;
