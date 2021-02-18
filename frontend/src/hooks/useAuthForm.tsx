import { useState, ChangeEvent } from 'react';

const useAuthForm = () => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPasswordCF, setInputPasswordCF] = useState('');

  const handleName = (e: ChangeEvent<HTMLInputElement>) => setInputName(e.target.value);
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setInputEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setInputPassword(e.target.value);
  const handlePasswordCF = (e: ChangeEvent<HTMLInputElement>) => setInputPasswordCF(e.target.value);

  return {
    inputName,
    inputEmail,
    inputPassword,
    inputPasswordCF,
    handleName,
    handleEmail,
    handlePassword,
    handlePasswordCF
  };
};

export default useAuthForm;
