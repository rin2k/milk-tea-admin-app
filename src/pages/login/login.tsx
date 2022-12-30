import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addInformation } from "../../redux/slices";

import "./login.css";
import { IUser } from "../../redux/slices/user.slice";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
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
    dispatch(addInformation(newData));
    navigate("/");
  };

  const renderContent = () => {
    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
          username: "22",
          password: "22",
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
}

export default Login;
