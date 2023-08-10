import React from 'react';
import AsyncSelect from 'react-select/async';

const CustomAsyncSelect = ({ data, onChange }) => {
  const loadOptions = (inputValue, callback) => {
    try {
      const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      const selectedOption = filteredData.length > 0 ? filteredData[0] : null;
      const options = selectedOption ? [{
        value: selectedOption.id,
        label: selectedOption.name
      }] : [];
      callback(options);
    } catch (error) {
      console.error('Error filtering data:', error);
      callback([]);
    }
  };
  const defaultOptions = data.slice(0, 5).map(item => ({ 
    value: item.id,
    label: item.name,
  }));
  
  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={defaultOptions}
      loadOptions={loadOptions}
      onChange={selectedOption => {
        if (selectedOption) {
          onChange(selectedOption.value); 
        } 
      }}
      // isClearable // Cho phép xóa option đã chọn
    />
  );
};

export default CustomAsyncSelect;
