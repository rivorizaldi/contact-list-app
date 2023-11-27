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
  type: string;
}

const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  handleCancel,
  onSubmit,
  data,
  type,
}) => {
  const [form] = Form.useForm<FormData>();

  return (
    <AntdModal
      title={type === "add" ? "Tambah Data" : "Edit Data"}
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form
        initialValues={data}
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onSubmit(values);
        }}
        onValuesChange={(changed) => {
          if (Object.getOwnPropertyDescriptor(changed, "contactNumber")) {
            const formatNumber = changed.contactNumber
              .toString()
              .replaceAll(/\D/g, "");

            form.setFieldValue("contactNumber", formatNumber);
          }
        }}
      >
        <Form.Item name="name" label="Nama" rules={[{ required: true }]}>
          <Input placeholder="Masukkan Nama" />
        </Form.Item>
        <Form.Item<FormData>
          name="contactNumber"
          label="No Hp"
          rules={[{ required: true }]}
        >
          <Input maxLength={13} placeholder="Masukkan No Hp" />
        </Form.Item>
        <Form.Item<FormData>>
          <Button type="primary" htmlType="submit">
            {type === "add" ? "Tambah" : "Edit"}
          </Button>
        </Form.Item>
      </Form>
    </AntdModal>
  );
};

export default Modal;
