import { useState } from 'react';

const useRecipeForm = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputCategory, setInputCategory] = useState('breakfast');
  const [inputDesc, setInputDesc] = useState('');
  const [inputNewDesc, setInputNewDesc] = useState('');

  return {
    inputTitle,
    inputCategory,
    inputDesc,
    inputNewDesc,
    setInputTitle,
    setInputCategory,
    setInputDesc,
    setInputNewDesc
  };
};

export default useRecipeForm;
