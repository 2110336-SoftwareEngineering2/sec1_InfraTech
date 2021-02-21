import React from 'react';
import { Button, Form, Radio } from 'antd';

// NOTE: draft version
const SelectRoleForm = ({ getState, setState, size, current, prev, next }) => {
  const [form] = Form.useForm();

  const onContinue = (values) => {
    // TODO: remove console.log
    console.log(values);
    setState('select-role', values);
    next();
  };

  const onBack = () => {
    const values = form.getFieldsValue();
    // TODO: remove console.log
    console.log(values);
    setState('select-role', values);
    prev();
  };

  return (
    <div>
      <div>
        Step {current} of {size}
      </div>
      <div>Select Role</div>
      <Form
        form={form}
        initialValues={getState('select-role', { role: 'trainer' })}
        onFinish={onContinue}
      >
        <Form.Item name="role">
          <Radio.Group>
            <Radio.Button value="trainer">Trainer</Radio.Button>
            <Radio.Button value="trainee">Trainee</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button onClick={onBack}>Back</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SelectRoleForm;
