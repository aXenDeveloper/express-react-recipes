import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCSRF } from '../context/csrf';
import config from '../config';

import Loading from '../components/Loading';

const RecipesView: FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [recipesList, setRecipesList] = useState<[]>([]);

	const { tokenCSRF }: any = useCSRF();

	useEffect(() => {
		document.title = `${config.title_page} - Recipes`;

		const getRecipesAPI = async () => {
			setLoading(true);

			try {
				const recipesAPI = await fetch(`${config.backend_url}/recipes`);
				const dataRecipesAPI = await recipesAPI.json();

				setRecipesList(dataRecipesAPI.recipe.reverse());

				setLoading(false);
			} catch (err) {
				console.error(err);
			}
		};

		getRecipesAPI();
	}, []);

	if (loading) return <Loading />;

	return (
		<div className="container">
			<div className="container_header">
				<h1>Recipes</h1>

				{tokenCSRF && (
					<Link to="/recipes/add" className="text_link:none">
						<button className="button button_important">Add new recipe</button>
					</Link>
				)}
			</div>

			<div className="container_wraper">
				<div className="container_wraper_main">
					<div className="container_box">
						<ul className="recipes_ul">
							{recipesList.length > 0 && (
								<>
									{recipesList.map((el: any) => (
										<li key={el._id}>
											<Link to={`/recipes/${el._id}`}>
												<div className="recipes_item">
													<img src={`${config.backend_url}/uploads/${el.image_url}`} alt={el.title} />
													<div className="recipes_item_title">{el.title}</div>
													<div className="recipes_item_category">{el.category}</div>
													<div className="recipes_item_author">{el.member_name}</div>
												</div>
											</Link>
										</li>
									))}
								</>
							)}
						</ul>
					</div>
				</div>

				<div className="container_wraper_widget">test</div>
			</div>
		</div>
	);
};

export default RecipesView;
