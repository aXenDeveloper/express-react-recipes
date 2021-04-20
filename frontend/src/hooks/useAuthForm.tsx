import { useState } from 'react';

const useAuthForm = () => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPasswordCF, setInputPasswordCF] = useState('');

  const handleName = (e: string) => setInputName(e);
  const handleEmail = (e: string) => setInputEmail(e);
  const handlePassword = (e: string) => setInputPassword(e);
  const handlePasswordCF = (e: string) => setInputPasswordCF(e);

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
