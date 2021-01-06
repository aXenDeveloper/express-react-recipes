import { FC } from 'react';

type RecipeIngredientsType = {
	ingredients: string;
};

const RecipeIngredients: FC<RecipeIngredientsType> = ({ ingredients }) => {
	const ingredientsJSON: [] = JSON.parse(ingredients);

	return (
		<div className="container_box">
			<div className="container_title">
				<h2>Ingredients</h2>
			</div>

			<div className="padding">
				{ingredientsJSON !== null ? (
					<>
						{ingredientsJSON.map((el: any) => (
							<div key={el.id} id={el.id}>
								{el.amount} - {el.element}
							</div>
						))}
					</>
				) : (
					<div>Nie ma</div>
				)}
			</div>
		</div>
	);
};

export default RecipeIngredients;
