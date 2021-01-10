import { FC } from 'react';
import { useCSRF } from '../context/csrf';
import { useQuery } from 'react-query';
import config from '../config';

import ErrorView from './ErrorView';
import IngredientsWidget from '../components/widgets/IngredientsWidget';
import Loading from '../components/Loading';
import ActionRecipeItem from '../components/recipes/ActionRecipeItem';

type RecipeItemViewType = {
	match: any;
};

const RecipeItemView: FC<RecipeItemViewType> = ({ match }) => {
	const { tokenCSRF, memberData }: any = useCSRF();

	const { isLoading, isError, data, isSuccess } = useQuery(
		'recipeItem',
		async () => {
			const res = await fetch(`${config.backend_url}/recipes/item?id=${match.params.id}`);
			return await res.json();
		},
		{ cacheTime: 0 }
	);

	if (isLoading) return <Loading />;

	if (isError) return <ErrorView code={500}>There was a problem with API connection.</ErrorView>;

	if (isSuccess) document.title = `${config.title_page} - Recipes - ${data.recipeItem.title}`;

	return (
		<div className="container">
			<div className="container_wraper">
				<div className="container_wraper_main">
					<div className="recipe_header">
						<img src={`${config.backend_url}/uploads/${data.recipeItem.image_url}`} alt={data.recipeItem.title} />

						<div className="recipe_header_content">
							<div className="recipe_header_content_box">
								<h1 className="recipe_header_content_box:title">{data.recipeItem.title}</h1>
								<div className="recipe_header_content_box:author">
									Author: <span>{data.recipeItem.member_name}</span>
								</div>
							</div>
						</div>
					</div>

					<div className="container_box padding">
						<div dangerouslySetInnerHTML={{ __html: data.recipeItem.description }} />
					</div>
				</div>

				<div className="container_wraper_widget">
					{tokenCSRF && (memberData.group_id === 4 || memberData._id === data.recipeItem.member_id) && (
						<ActionRecipeItem _id={data.recipeItem._id} />
					)}

					<IngredientsWidget ingredients={data.recipeItem.ingredients} />
				</div>
			</div>
		</div>
	);
};

export default RecipeItemView;
