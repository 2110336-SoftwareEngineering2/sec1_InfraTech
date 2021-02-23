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
    <Row className="flex justify-center w-full">
      <div className="mx-6 mb-4">
        <SelectionCard
          checked={value == USER_TYPE.TRAINER}
          imageUrl="/trainer.svg"
          description="Trainer"
          onClick={() => onClick(USER_TYPE.TRAINER)}
          width={250}
          height={250}
        />
      </div>
      <div className="mx-6 mb-4">
        <SelectionCard
          checked={value == USER_TYPE.TRAINEE}
          imageUrl="/trainee.svg"
          description="Trainee"
          onClick={() => onClick(USER_TYPE.TRAINEE)}
          width={250}
          height={250}
        />
      </div>
    </Row>
  );
};

export default SelectRoleInput;
