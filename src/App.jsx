import React, { useEffect, useState } from 'react';
import CustomSelect from './components/CustomSelect';
import { api } from './components/CustomSelect/constants';

const App = () => {
  const [options, setOptions] = useState([]);
  const handleChange = (selectedValue) => {
    console.log('Selected value:', selectedValue);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      const response = await fetch(api.URL, {
        headers: {
          'X-Parse-Application-Id': api.ID, // This is the fake app's application id
          'X-Parse-Master-Key': api.KEY, // This is the fake app's readonly master key
        },
      });
      const data = await response.json();
      setOptions(data.results);
    };

    fetchOptions();
  }, []);

  return (
    <div className="App">
      <h1>Custom Select Dropdown</h1>
      <CustomSelect options={options} onChange={handleChange} />
    </div>
  );
};

export default App;
