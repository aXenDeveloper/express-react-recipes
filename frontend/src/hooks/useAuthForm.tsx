import { useState, ChangeEvent } from 'react';

const useAuthForm = () => {
	const [inputName, setInputName] = useState<string>('');
	const [inputEmail, setInputEmail] = useState<string>('');
	const [inputPassword, setInputPassword] = useState<string>('');
	const [inputPasswordCF, setInputPasswordCF] = useState<string>('');

	const handleName = (e: ChangeEvent<HTMLInputElement>): void => setInputName(e.target.value);
	const handleEmail = (e: ChangeEvent<HTMLInputElement>): void => setInputEmail(e.target.value);
	const handlePassword = (e: ChangeEvent<HTMLInputElement>): void => setInputPassword(e.target.value);
	const handlePasswordCF = (e: ChangeEvent<HTMLInputElement>): void => setInputPasswordCF(e.target.value);

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
