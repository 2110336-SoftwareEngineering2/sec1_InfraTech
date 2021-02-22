import React, { useState } from 'react';
import { Button, Checkbox, Form, Row, Col } from 'antd';
import SelectionCard from '../SelectionCard';

const SelectPreferencesInput = ({ value = [], onChange }) => {
  const preferenceOptions = [
    { imageUrl: '/cardiovascular.svg', description: 'Cardiovascular', value: 'cardiovascular' },
    { imageUrl: '/balance.svg', description: 'Balance', value: 'balance' },
    { imageUrl: '/flexibility.svg', description: 'Flexibility', value: 'flexibility' },
    { imageUrl: '/strength.svg', description: 'Strength', value: 'strength' },
  ];

  const onClick = selectedIndex => {
    if(onChange){
      onChange(preferenceOptions.filter((option, index) => {
        return (index == selectedIndex && !value.includes(option.value)) || (index != selectedIndex && value.includes(option.value))
      }).map(option => option.value))
    }
  }

  let displayPerferences = []
  for(let index=0; index<preferenceOptions.length; index+=2){
    if(index+1<preferenceOptions.length){
      displayPerferences.push(
        <Row key={index}>
          <Col span={12} >
            <SelectionCard 
              checked={value.includes(preferenceOptions[index].value)} 
              imageUrl={preferenceOptions[index].imageUrl} 
              description={preferenceOptions[index].description} 
              onClick={() => onClick(index)} />
          </Col>
          <Col span={12} >
            <SelectionCard 
              checked={value.includes(preferenceOptions[index+1].value)} 
              imageUrl={preferenceOptions[index+1].imageUrl} 
              description={preferenceOptions[index+1].description} 
              onClick={() => onClick(index+1)} />
          </Col>
        </Row>
      )
    }
    else {
      displayPerferences.push(
        <Row>
          <Col span={12} >
            <SelectionCard 
              checked={value.includes(preferenceOptions[index].value)} 
              imageUrl={preferenceOptions[index].imageUrl} 
              description={preferenceOptions[index].description} 
              onClick={() => onClick(index)} />
          </Col>
        </Row>
      )
    }
  }

  return (  
    <div>
      {displayPerferences}
    </div>
  );
};

const SelectPreferencesForm = ({
  getState,
  setState,
  size,
  current,
  prev,
  next,
}) => {
  const [form] = Form.useForm();

  const onContinue = (values) => {
    // TODO: remove console.log
    console.log(values);
    setState('select-preferences', values);
    next();
  };

  const onBack = () => {
    const values = form.getFieldsValue();
    // TODO: remove console.log
    console.log(values);
    setState('select-preferences', values);
    prev();
  };

  const preferenceOptions = [
    { label: 'Cardiovascular', value: 'cardiovascular' },
    { label: 'Balance', value: 'balance' },
    { label: 'Flexibility', value: 'flexibility' },
    { label: 'Strength', value: 'strength' },
  ];

  return (
    <div>
      <div>
        Step {current} of {size}
      </div>
      <div className="text-3xl sm:text-4xl font-bold">Select Preferences</div>
      <Form
        form={form}
        initialValues={getState('select-preferences', { preferences: [] })}
        onFinish={onContinue}
      >
        <Form.Item name="preferences">
          <SelectPreferencesInput/>
        </Form.Item>
        <Form.Item className="text-center">
          <Button onClick={onBack} className="w-24 mr-4">Back</Button>
          <Button type="primary" htmlType="submit" className="w-24 ml-4">
            Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SelectPreferencesForm;
