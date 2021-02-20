import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Form, Radio, Card, Row } from 'antd';

const { Meta } = Card;

// NOTE: draft version
const SelectRoleForm = ({ getState, setState, size, current, prev, next }) => {
  const [form] = Form.useForm();
  const [role, setRole] = useState(getState('select-role', { role: 'trainer' }).role)

  const onContinue = (values) => {
    // TODO: remove console.log
    console.log(role);
    setState('select-role', {role: role});
    next();
  };

  const onBack = () => {
    //const values = form.getFieldsValue();
    // TODO: remove console.log
    //console.log(values);
    setState('select-role', {role: role});
    prev();
  };
  console.log(role)

  return (
    <div>
      <div>
        Step {current} of {size}
      </div>
      <div className="text-3xl sm:text-4xl font-bold">Select Role</div>
      <Form
        form={form}
        initialValues={getState('select-role', { role: 'trainer' })}
        onFinish={onContinue}
      >
        <Row gutter={6}>
          <Card onClick={() => setRole("trainer")} style={{ width: 240 }} className={role == "trainer" ? "p-3 m-5 rounded-lg border-blue":"p-3 m-5 rounded-lg border-gray"} cover={<Image src="/trainer.svg" width={240} height={180} />}>
            <Meta title={<p className={role == "trainer" ? "text-blue" : null}>Trainer</p>} className="text-center"/>
          </Card>
          <Card onClick={() => setRole("trainee")} style={{ width: 240 }} className={role == "trainee" ? "p-3 m-5 rounded-lg border-blue":"p-3 m-5 rounded-lg border-gray"} cover={<Image src="/trainee.svg" width={240} height={180} />}>
            <Meta title={<p className={role == "trainee" ? "text-blue" : null}>Trainee</p>} className="text-center"/>
          </Card>
        </Row>
        <Form.Item className="text-center">
          <Button onClick={onBack} className="w-24 m-2">Back</Button>
          <Button type="primary" htmlType="submit" className="w-24 m-2">
            Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SelectRoleForm;
