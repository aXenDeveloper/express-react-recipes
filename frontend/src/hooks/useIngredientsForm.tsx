import { useState, ChangeEvent } from 'react';
import uniqid from 'uniqid';

const useIngredientsForm = () => {
	const [inputingredient, setInputingredient] = useState('');
	const [listIngredients, setListIngredients] = useState<any>();

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
		setListIngredients(
			listIngredients.map((item: any) =>
				item.id === e.target.id
					? {
							id: item.id,
							text: e.target.value
					  }
					: item
			)
		);
	};

	const removeIngredient = (id: string) => setListIngredients(listIngredients.filter((el: any) => el.id !== id));

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
