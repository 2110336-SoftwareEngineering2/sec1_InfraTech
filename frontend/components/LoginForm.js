import { Form, Input, Button } from 'antd';

const LoginForm = ({ form, onSubmit }) => {
  return (
    <Form
      className="mt-6 w-80"
      layout={'vertical'}
      form={form}
      onFinish={onSubmit}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email' }]}
      >
        <Input className="form-text-box" placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password' }]}
      >
        <Input
          className="form-text-box password"
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
