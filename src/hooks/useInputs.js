import { useState } from 'react';

const useInputs = (defaultValue = '') => {
  const [value, setValue] = useState(defaultValue);
  const handleValueChange = ({ target }) => {
    setValue(target.value);
  };
  return [value, handleValueChange, setValue];
};

export default useInputs;