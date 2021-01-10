import { useState, ChangeEvent } from 'react';
import uniqid from 'uniqid';

const useIngredientsForm = () => {
	const [inputingredient, setInputingredient] = useState('');
	const [listIngredients, setListIngredients] = useState<any[]>();

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => setInputingredient(e.target.value);

	const addIngredient = () => {
		if (listIngredients) {
			setListIngredients([
				...listIngredients,
				{
					id: uniqid('ingredient-'),
					text: inputingredient
				}
			]);
		} else {
			setListIngredients([
				{
					id: uniqid('ingredient-'),
					text: inputingredient
				}
			]);
		}

		setInputingredient('');
	};

	const upadateIngredient = (e: ChangeEvent<HTMLInputElement>) => {
		if (listIngredients)
			setListIngredients(
				listIngredients.map((item: { id: string }) =>
					item.id === e.target.id
						? {
								id: item.id,
								text: e.target.value
						  }
						: item
				)
			);
	};

	const removeIngredient = (id: string) => {
		if (listIngredients) setListIngredients(listIngredients.filter((el: { id: string }) => el.id !== id));
	};

	return {
		inputingredient,
		listIngredients,
		removeIngredient,
		upadateIngredient,
		addIngredient,
		handleInput,
		setListIngredients
	};
};

export default useIngredientsForm;
