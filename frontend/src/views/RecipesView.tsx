import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useCSRF } from '../context/csrf';
import config from '../config';

import Loading from '../components/Loading';
import Error from '../components/Error';

const RecipesView: FC = () => {
	useEffect(() => {
		document.title = `${config.title_page} - Recipes`;
	}, []);

	const { tokenCSRF }: any = useCSRF();
	const { isLoading, isError, data } = useQuery('recipeList', async () => {
		const res = await fetch(`${config.backend_url}/recipes`);
		return res.json();
	});

	if (isLoading)
		return (
			<div className="container">
				<Loading />
			</div>
		);

	if (isError) return <Error code={500}>There was a problem with API connection.</Error>;

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
							{data.recipe
								.map((item: any) => (
									<li key={item._id}>
										<Link to={`/recipes/${item._id}`}>
											<div className="recipes_item">
												<img src={`${config.backend_url}/uploads/${item.image_url}`} alt={item.title} />
												<div className="recipes_item_title">{item.title}</div>
												<div className="recipes_item_category">{item.category}</div>
												<div className="recipes_item_author">{item.member_name}</div>
											</div>
										</Link>
									</li>
								))
								.reverse()}
						</ul>
					</div>
				</div>

				<div className="container_wraper_widget">test</div>
			</div>
		</div>
	);
};

export default RecipesView;
