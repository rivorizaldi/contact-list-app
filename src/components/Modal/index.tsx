import { Modal as AntdModal, Button, Form, Input } from "antd";

export type FormData = {
  id?: string;
  name?: string;
  contactNumber?: string;
};

interface ModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  onSubmit: (data: FormData) => void;
  data: FormData;
}

const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  handleCancel,
  onSubmit,
  data,
}) => {
  const [form] = Form.useForm<FormData>();

  return (
    <AntdModal
      title="Tambah Data"
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form
        initialValues={data}
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Form.Item name="name" label="Nama" rules={[{ required: true }]}>
          <Input placeholder="Masukkan Nama" />
        </Form.Item>
        <Form.Item<FormData>
          name="contactNumber"
          label="No Hp"
          rules={[{ required: true }]}
        >
          <Input placeholder="Masukkan No Hp" />
        </Form.Item>
        <Form.Item<FormData>>
          <Button type="primary" htmlType="submit">
            Tambah
          </Button>
        </Form.Item>
      </Form>
    </AntdModal>
  );
};

export default Modal;
