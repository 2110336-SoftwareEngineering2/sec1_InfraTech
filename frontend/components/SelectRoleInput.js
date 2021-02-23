import { Row } from 'antd';
import SelectionCard from './SelectionCard';
import { USER_TYPE } from '../config/UserType.config';

const SelectRoleInput = ({ value, onChange }) => {
  const onClick = (role) => {
    if (onChange) {
      onChange(role);
    }
  };
  return (
    <Row className="flex justify-around w-full">
      <SelectionCard
        checked={value == USER_TYPE.TRAINER}
        imageUrl="/trainer.svg"
        description="Trainer"
        onClick={() => onClick(USER_TYPE.TRAINER)}
      />
      <SelectionCard
        checked={value == USER_TYPE.TRAINEE}
        imageUrl="/trainee.svg"
        description="Trainee"
        onClick={() => onClick(USER_TYPE.TRAINEE)}
      />
    </Row>
  );
};

export default SelectRoleInput;
