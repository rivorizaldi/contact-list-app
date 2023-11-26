import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin } from "antd";

export type FieldType = {
  email?: string;
  password?: string;
};

const SignUp: React.FC<{
  onSignup: (value: FieldType) => void;
  isLoading: boolean;
}> = ({ onSignup, isLoading }) => {
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onSignup}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Silahkan masukkan username!" },
          { type: "email", message: "Format email belum tepat" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Silahkan masukkan password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {isLoading ? (
            <Spin
              size="small"
              indicator={<LoadingOutlined style={{ color: "white" }} spin />}
            />
          ) : (
            "Sign Up"
          )}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
