import SelectionCard from './SelectionCard'

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
  
    return (  
      <div className="w-full flex flex-wrap justify-around item-center">
      {
        preferenceOptions.map((option, index) => (
          <SelectionCard 
            checked={value.includes(option.value)} 
            imageUrl={option.imageUrl} 
            description={option.description} 
            onClick={() => onClick(index)} 
            key={option.value}/>
        ))
      }
      </div>
    );
  };

  export default SelectPreferencesInput;