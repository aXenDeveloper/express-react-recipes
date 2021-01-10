import { ChangeEvent, FC } from 'react';

type IngredientsFormType = {
	inputingredient: string;
	listIngredients: any;
	removeIngredient: (id: string) => void;
	upadateIngredient: (e: React.ChangeEvent<HTMLInputElement>) => void;
	addIngredient: () => void;
	handleInput: (e: ChangeEvent) => void;
};

const IngredientsForm: FC<IngredientsFormType> = ({
	inputingredient,
	listIngredients,
	removeIngredient,
	upadateIngredient,
	addIngredient,
	handleInput
}) => {
	return (
		<li>
			<label className="input_label">Ingredients</label>

			{listIngredients ? (
				<ul className="form_ul">
					{listIngredients.map(({ id, text }: any) => (
						<li className="flex" key={`item-${id}`}>
							<input className="input input_text flex:11 margin-right" id={id} onChange={upadateIngredient} value={text} />
							<button className="button button_primary" type="button" onClick={() => removeIngredient(id)}>
								X
							</button>
						</li>
					))}
				</ul>
			) : (
				<div className="message message-info">You haven't added any ingredients yet.</div>
			)}

			<div className="flex margin-top">
				<input type="text" className="input input_text flex:11 margin-right" onChange={handleInput} value={inputingredient} />
				<button className="button button_primary" type="button" onClick={addIngredient} disabled={!inputingredient}>
					Add
				</button>
			</div>
		</li>
	);
};

export default IngredientsForm;
