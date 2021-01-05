import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import { useCSRF } from '../context/csrf';

const RecipesView: FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [recipesList, setRecipesList] = useState<[]>([]);

	const { tokenCSRF }: any = useCSRF();

	useEffect(() => {
		document.title = `${config.title_page} - Recipes`;
		api();
	}, []);

	const api = async () => {
		try {
			setLoading(true);
			const recipesAPI = await fetch(`${config.backend_url}/recipes`);

			const dataRecipesAPI = await recipesAPI.json();

			// console.log(JSON.parse(dataRecipesAPI.recipe[0].ingredients));
			setRecipesList(dataRecipesAPI.recipe.reverse());
			console.log(dataRecipesAPI.recipe.reverse());

			setLoading(false);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="container">
			<div className="container_header">
				<h1>Recipes</h1>

				{tokenCSRF && (
					<Link to="/recipes/add">
						<button className="button button_important">Add new recipe</button>
					</Link>
				)}
			</div>

			<div className="container_wraper">
				<div className="container_wraper_main">
					<div className="container_box">
						<div className="padding">
							{loading ? (
								<div className="loading"></div>
							) : (
								<ul className="recipes_ul">
									{recipesList.length > 0 ? (
										<>
											{recipesList.map((el: any) => (
												<li key={el._id}>
													<Link to="/recipes">
														<div className="recipes_item">
															<img src={`${config.backend_url}/uploads/${el.imageURL}`} alt={el.title} />
															<div className="recipes_item_title">{el.title}</div>
															<div className="recipes_item_category">{el.category}</div>
															<div className="recipes_item_author">aXen</div>
														</div>
													</Link>
												</li>
											))}
										</>
									) : (
										<li>No recipes</li>
									)}
								</ul>
							)}
						</div>
					</div>
				</div>
				<div className="container_wraper_widget">test</div>
			</div>
		</div>
	);
};

export default RecipesView;
