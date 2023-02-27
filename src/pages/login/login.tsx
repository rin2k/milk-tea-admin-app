import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { addAdmin, RootState } from "@redux";
import { AdminLoginService } from "@services";
import { Button, Checkbox, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./login.css";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nn = useSelector((state: RootState) => state.authAdmin);

  const onFinish = async (values: any) => {
    AdminLoginService(values.username, values.password, (data) => {
      dispatch(addAdmin(data.id));
      navigate("/");
    });
  };

  const renderContent = () => {
    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
          username: "",
          password: "",
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
