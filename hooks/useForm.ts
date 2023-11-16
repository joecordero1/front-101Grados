import { useState, useEffect } from 'react';

// Create useForm custom hook typed with T
export const useForm = <T extends Object>(form: T) => {
  // Create state for form
  const [state, setState] = useState(form);
  // Touced state is an object witch contains all properties with its values that have been altered compared to the initial state
  const [touched, setTouched] = useState<Partial<T>>({});

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

  // Touced state is an object witch contains all properties with its values that have been altered compared to the initial state
  const handleTouched = () => {
    // Compare the current state with the initial state
    const isTouched = state !== form;
    // If the state is touched I have to get the keys with the values that have been altered
    if (isTouched) {
      const keys = Object.keys(state);
      const touchedState = keys.reduce((acc, key) => {
        if (state[key] !== form[key]) {
          acc[key] = state[key];
        }
        return acc;
      }, {});
      setTouched(touchedState);
    }
  };

  useEffect(() => {
    handleTouched();
  }, [state]);

  return {
    ...state,
    values: state,
    onChange,
    reset,
    touched,
  };
};
