import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { db } from "@config";
import { COLLECTIONS } from "@constants";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { IUser } from "../../redux/slices/user.slice";
import "./login.css";
export const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    signInWithEmailAndPassword(auth, values.username, values.password)
      .then(async (userCredential) => {})
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            break;
          case "auth/user-not-found":
            break;
          case "auth/wrong-password":
            break;

          default:
            break;
        }
        alert(error);
      });
    let newData: IUser = {
      token: {
        refresh: "c",
        access: "access",
      },
      user: {
        id: "id",
        email: "email",
        is_active: true,
        date_joined: "date_joined",
      },
      isAuthenticated: true,
    };
    // dispatch(addInformation(newData));
    // navigate("/");
  };

  const renderContent = () => {
    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
          username: "cc@gmail.com",
          password: "123456",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Nhớ mật khẩu</Checkbox>
          </Form.Item>
          <a className="login-form-forgot" href="">
            Quên mật khẩu
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {renderContent()}
    </div>
  );
};
