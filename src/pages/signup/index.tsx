/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useContext } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { post } from '../../api';
import { openNotification } from '../../components/notification';
import { AuthContext } from '../../context';

const Singup: FC = () => {
  const { push } = useHistory()
  const { dispatchAuthAction } = useContext(AuthContext)

  const onFinish = async (values: { username: string, name: string, password: string }) => {
    const { code, data } = await post({ url: "/user/create", body: values })
    if (code === 200) {
      openNotification({ type: 'success', title: 'Signup', message: 'Create successfully' })
      localStorage.setItem('token', data.token)
      localStorage.setItem('userId', data.userId)
      dispatchAuthAction({ type: "SWITCH_AUTH_STATE", payload: { state: true } })
      push('/dashboard')
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
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
          </Form.Item>
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
            <Button type="primary" htmlType="submit" className="login-form-button">
              Signup
          </Button> Or
          <Button type="link" onClick={() => push('/login')}>login now!</Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default Singup;