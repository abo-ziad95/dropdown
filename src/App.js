import React from 'react';
import CustomSelect from './components/CustomSelect';

const App = () => {
  const handleChange = (selectedValue) => {
    console.log('Selected value:', selectedValue);
  };

  return (
    <div className="App">
      <h1>Custom Select Dropdown</h1>
      <CustomSelect onChange={handleChange} />
    </div>
  );
};

export default App;
