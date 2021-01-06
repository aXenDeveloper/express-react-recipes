import { FC, ChangeEvent } from 'react';

type IngredientsType = {
	listIngredient: [];
	removeIngredient(el: string): void;
	handleIngredient(event: ChangeEvent<HTMLInputElement>): void;
	inputIngredient: string;
	addIngredient(): void;
	inputIngredientAmount: number;
	handleIngredientAmount(event: ChangeEvent<HTMLInputElement>): void;
};

const Ingredients: FC<IngredientsType> = ({
	listIngredient,
	removeIngredient,
	handleIngredient,
	inputIngredient,
	addIngredient,
	inputIngredientAmount,
	handleIngredientAmount
}) => {
	return (
		<div className="form_ingredient">
			<ul className="form_ingredient_ul">
				{listIngredient.map((ingredient: any) => (
					<li className="flex flex-ai:center flex-jc:space-between" key={ingredient.id}>
						<div>
							{ingredient.amount} - {ingredient.element}
						</div>

						<button className="button button_primary" onClick={() => removeIngredient(ingredient.id)} type="button">
							Remove
						</button>
					</li>
				))}
			</ul>

			<div className="flex flex-jc:space-between margin-top">
				<input type="number" className="input input_text margin-right" onChange={handleIngredientAmount} value={inputIngredientAmount} />

				<input type="text" className="input input_text flex:11 margin-right" onChange={handleIngredient} value={inputIngredient} />
				<button className="button button_primary" type="button" onClick={addIngredient}>
					Add
				</button>
			</div>
		</div>
	);
};

export default Ingredients;
