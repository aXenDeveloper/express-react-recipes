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
			const api = await fetch(`${config.backend_url}/recipes`);

			const data = await api.json();
			setRecipesList(data.recipe.reverse());
			console.log(data.recipe.reverse());

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
								<div>
									{recipesList.map((el: any) => (
										<div key={el._id}>{el.title}</div>
									))}
								</div>
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
