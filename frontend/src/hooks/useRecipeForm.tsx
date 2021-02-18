import { useState, ChangeEvent } from 'react';

const useRecipeForm = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputCategory, setInputCategory] = useState('breakfast');
  const [inputDesc, setInputDesc] = useState('');

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => setInputTitle(e.target.value);
  const handleCategory = (e: ChangeEvent<HTMLInputElement>) => setInputCategory(e.target.value);

  return {
    inputTitle,
    inputCategory,
    inputDesc,
    handleTitle,
    handleCategory,
    setInputTitle,
    setInputCategory,
    setInputDesc
  };
};

export default useRecipeForm;
