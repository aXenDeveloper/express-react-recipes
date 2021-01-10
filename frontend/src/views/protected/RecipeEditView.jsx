import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { useCSRF } from '../../context/csrf';
import config from '../../config';

import IngredientsForm from '../../components/recipes/IngredientsForm';
import Loading from '../../components/Loading';
import ErrorView from '../ErrorView';
import useIngredientsForm from '../../hooks/useIngredientsForm';

const RecipeEditView = ({ match }) => {
	const history = useHistory();

	const {
		inputingredient,
		listIngredients,
		removeIngredient,
		upadateIngredient,
		addIngredient,
		handleInput,
		setListIngredients
	} = useIngredientsForm();

	const [inputTitle, setInputTitle] = useState('');
	const [inputCategory, setInputCategory] = useState('breakfast');
	const [inputDesc, setInputDesc] = useState('');

	const getDataItem = useQuery(
		'recipeItemEdit',
		async () => {
			const res = await fetch(`${config.backend_url}/recipes/item?id=${match.params.id}`);
			const data = await res.json();

			if (res.status === 200) {
				setInputTitle(data.recipeItem.title);
				setInputDesc(data.recipeItem.description);
				setInputCategory(data.recipeItem.category);
				setListIngredients(JSON.parse(data.recipeItem.ingredients));

				document.title = `${config.title_page} - Recipes - Edit: ${data.recipeItem.title}`;
			}

			return data;
		},
		{ cacheTime: 0 }
	);

	const { tokenCSRF } = useCSRF();

	const { register, handleSubmit, errors } = useForm();

	const { mutateAsync, isLoading } = useMutation(async () => {
		const api = await fetch(`${config.backend_url}/recipes/edit?id=${match.params.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				CSRF_Token: tokenCSRF
			},
			body: JSON.stringify({
				title: inputTitle,
				category: inputCategory,
				ingredients: JSON.stringify(listIngredients),
				description: inputDesc
			})
		});

		const data = await api.json();
		if (api.status === 200) {
			history.push(`/recipes/${data.recipe._id}`);
		}

		return data;
	});

	const queryClient = useQueryClient();
	const onSubmit = async () => {
		await mutateAsync();
		queryClient.invalidateQueries('recipeList');
	};

	const handleTitle = e => setInputTitle(e.target.value);
	const handleCategory = e => setInputCategory(e.target.value);

	if (getDataItem.isLoading || isLoading) return <Loading />;

	if (getDataItem.isError) return <ErrorView code={500}>There was a problem with API connection.</ErrorView>;

	return (
		<form className="form container container:medium" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
			<div className="container_box padding">
				<ul className="form_ul">
					<li>
						<label htmlFor="title" className="input_label">
							Title
						</label>
						<input
							type="text"
							id="title"
							name="title"
							className={`input input_text input_full${errors.title ? ' input_error' : ''}`}
							onChange={handleTitle}
							value={inputTitle}
							ref={register({ required: true })}
						/>
					</li>

					<li>
						<label htmlFor="category" className="input_label">
							Category
						</label>
						<select
							id="category"
							name="category"
							onChange={handleCategory}
							className="input input_select input_full"
							ref={register({ required: true })}
						>
							<option value="breakfast">Śniadanie</option>
							<option value="dinner">Obiad</option>
							<option value="salads">Salads</option>
							<option value="pizza">Pizza</option>
							<option value="cakes">Ciasta i desery</option>
							<option value="icecream">Lody</option>
						</select>
					</li>

					<li>
						<CKEditor
							editor={ClassicEditor}
							data={inputDesc}
							onChange={(event, editor) => {
								const data = editor.getData();
								setInputDesc(data);
							}}
							config={{
								removePlugins: ['Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload'],
								width: 'auto'
							}}
						/>
					</li>

					<IngredientsForm
						inputingredient={inputingredient}
						listIngredients={listIngredients}
						removeIngredient={removeIngredient}
						upadateIngredient={upadateIngredient}
						addIngredient={addIngredient}
						handleInput={handleInput}
					/>

					<div className="flex flex-ai:center flex-jc:center padding-top">
						<button className="button button_primary" type="submit">
							Edit recipe
						</button>
					</div>
				</ul>
			</div>
		</form>
	);
};

export default RecipeEditView;
