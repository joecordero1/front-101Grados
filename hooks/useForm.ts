import { useState, useEffect } from 'react';

// Create useForm custom hook typed with T
export const useForm = <T extends Object>(form: T) => {
  // Create state for form
  const [state, setState] = useState(form);

  // Create onChange handler
  const onChange = (field: keyof T, value: any) => {
    setState({
      ...state,
      [field]: value,
    });
  };

  const reset = () => {
    setState(form);
  };

  return {
    ...state,
    values: state,
    onChange,
    reset,
  };
};
