import { GoogleOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, Divider, Row, Tabs, message } from "antd";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login, { FieldType } from "../../components/Login";
import SignUp from "../../components/SignUp";
import { auth } from "../../utils/firebase";

const SignIn = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [messageApi] = message.useMessage();

  const onSignin = (values: FieldType) => {
    const { email, password } = values;
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email as string, password as string)
      .then(() => {
        navigate("/contacts");
      })
      .catch((error) => {
        setErrorCode(error.code);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSignup = (values: FieldType) => {
    const { email, password } = values;
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email as string, password as string)
      .then(() => {
        setActiveTab("login");
        messageApi.open({
          type: "success",
          content: "Sukses daftar, Silahkan Login!",
        });
      })
      .catch((error) => {
        setErrorCode(error.code);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSocialLogin = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/contacts");
      }
    });
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000040",
      }}
    >
      <Row>
        <Col>
          <Card style={{ width: 300 }}>
            {errorCode === "auth/invalid-login-credentials" && (
              <Alert
                message={"username atau password salah"}
                type="error"
                showIcon
              />
            )}
            {errorCode === "auth/weak-password" && (
              <Alert
                message={"Buat password yang lebih sulit"}
                type="error"
                showIcon
              />
            )}
            {errorCode === "auth/email-already-in-use" && (
              <Alert
                message={"Email sudah pernah terdaftar"}
                type="error"
                showIcon
              />
            )}

            <Tabs
              destroyInactiveTabPane
              defaultActiveKey="login"
              activeKey={activeTab}
              onChange={(activeKey) => {
                setActiveTab(activeKey);
                setErrorCode("");
              }}
              centered
              items={[
                {
                  key: "login",
                  label: "Login",
                  children: <Login onLogin={onSignin} isLoading={isLoading} />,
                },
                {
                  key: "signup",
                  label: "Signup",
                  children: (
                    <SignUp onSignup={onSignup} isLoading={isLoading} />
                  ),
                },
              ]}
            />

            <Divider style={{ borderColor: "gray", fontSize: "12px" }}>
              <p style={{ color: "gray" }}>Atau Masuk Dengan:</p>
            </Divider>
            <Row justify={"center"}>
              <Button onClick={handleSocialLogin} icon={<GoogleOutlined />} />
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
