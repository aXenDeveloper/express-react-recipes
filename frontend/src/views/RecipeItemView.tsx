import { FC, useEffect, useState } from 'react';
import ErrorView from './ErrorView';
import config from '../config';

type RecipeItemViewType = {
	match: any;
};

const RecipeItemView: FC<RecipeItemViewType> = ({ match }) => {
	const [statusItem, setStatusItem] = useState<number>(0);
	const [dataItem, setDataItem] = useState<any>({});
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const api = async () => {
			try {
				setLoading(true);
				const itemAPI = await fetch(`${config.backend_url}/recipes/item?id=${match.params.id}`);

				const dataItemAPI = await itemAPI.json();

				if (itemAPI.status === 200) {
					setDataItem(dataItemAPI.recipeItem[0]);
					document.title = `${config.title_page} - Recipes - ${dataItemAPI.recipeItem[0].title}`;
					setStatusItem(itemAPI.status);
				} else setStatusItem(itemAPI.status);

				setLoading(false);
			} catch (err) {
				console.error(err);
			}
		};
		api();
	}, [match.params.id]);

	return (
		<div className="container">
			{loading ? (
				<div className="loading"></div>
			) : (
				<>
					{statusItem === 200 ? (
						<div>RecipeItemView - {dataItem.title}</div>
					) : (
						<ErrorView code={404}>The page you requested does not exist</ErrorView>
					)}
				</>
			)}
		</div>
	);
};

export default RecipeItemView;
