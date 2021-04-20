import { useState } from 'react';

const useRecipeForm = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputCategory, setInputCategory] = useState('breakfast');
  const [inputDesc, setInputDesc] = useState('');
  const [inputNewDesc, setInputNewDesc] = useState('');

  const handleTitle = (e: string) => setInputTitle(e);
  const handleCategory = (e: string) => setInputCategory(e);

  return {
    inputTitle,
    inputCategory,
    inputDesc,
    inputNewDesc,
    handleTitle,
    handleCategory,
    setInputTitle,
    setInputCategory,
    setInputDesc,
    setInputNewDesc
  };
};

export default useRecipeForm;
