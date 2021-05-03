import { FC, useContext, useEffect } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context';
import { post } from '../../api';
import { openNotification } from '../../components/notification';

const Login: FC = () => {
  const { push } = useHistory()
  const { authState, dispatchAuthAction } = useContext(AuthContext)

  useEffect(() => {
    console.log(authState)
  })

  const onFinish = async (values: any) => {
    try {
      const { data, code } = await post({ url: "/user/login", body: values });
      if (code === 403) {
        openNotification({ type: "error", message: "Wrong username or password", title: 'Login fail' })
      }
      if (data) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.userId)
        dispatchAuthAction({ type: "SWITCH_AUTH_STATE", payload: { state: true } })
        push('/dashboard')
      }
    } catch (e) {
      openNotification({ type: "error", message: "Some thing wrong, please try again", title: "Login fail" })
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100%' }}>
      <Col lg={12} md={12} sm={12} xs={12} >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <a className="login-form-forgot" href="forgot">
              Forgot password
          </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
          </Button>  Or<Button type="link" onClick={() => push('/signup')}>register now!</Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;