import { useEffect, useState } from 'react';
import { useCSRF } from '../../context/csrf';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import uniqid from 'uniqid';
import config from '../../config';

import ErrorView from '../ErrorView';
import IngredientsForm from '../../components/IngredientsForm';

const RecipeEditView = ({ match, history }) => {
	const [inputTitle, setInputTitle] = useState('');
	const [inputDesc, setInputDesc] = useState('');
	const [inputCategory, setInputCategory] = useState('breakfast');

	const [statusItem, setStatusItem] = useState(0);
	const [loading, setLoading] = useState(false);
	const [dataItem, setDataItem] = useState({});

	const [inputIngredient, setInputIngredient] = useState('');
	const [inputIngredientAmount, setInputIngredientAmount] = useState(0);
	const [listIngredient, setListIngredient] = useState([]);

	const { tokenCSRF, memberData, statusVerifyCSRF } = useCSRF();

	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const getItemAPI = async () => {
			setLoading(true);

			try {
				const itemAPI = await fetch(`${config.backend_url}/recipes/item?id=${match.params.id}`);
				const dataItemAPI = await itemAPI.json();

				if (itemAPI.status === 200) {
					setDataItem(dataItemAPI.recipeItem);
					setStatusItem(itemAPI.status);
					setInputTitle(dataItemAPI.recipeItem.title);
					setInputDesc(dataItemAPI.recipeItem.description);
					setInputCategory(dataItemAPI.recipeItem.category);
					setListIngredient(JSON.parse(dataItemAPI.recipeItem.ingredients));

					document.title = `${config.title_page} - Recipes - Edit: ${dataItemAPI.recipeItem.title}`;

					setLoading(false);
				} else setStatusItem(itemAPI.status);
			} catch (err) {
				console.error(err);
			}
		};

		getItemAPI();
	}, [match.params.id]);

	if (loading) {
		return (
			<div className="container">
				<div className="loading" />
			</div>
		);
	}

	if (statusItem !== 200) {
		return <ErrorView code={404}>The page you requested does not exist</ErrorView>;
	}

	const addIngredient = () => {
		setListIngredient([
			...listIngredient,
			{
				id: uniqid(),
				amount: inputIngredientAmount,
				element: inputIngredient
			}
		]);

		setInputIngredient('');
		setInputIngredientAmount(0);
	};

	const removeIngredient = id => {
		setListIngredient(listIngredient.filter(el => el.id !== id));
	};

	const handleTitle = e => setInputTitle(e.target.value);
	const handleCategory = e => setInputCategory(e.target.value);
	const handleIngredient = e => setInputIngredient(e.target.value);
	const handleIngredientAmount = e => setInputIngredientAmount(e.target.value);

	const apiSubmit = async () => {
		/*const formData = new FormData();
		formData.append('productImage', inputImage);
		formData.append('title', inputTitle);
		formData.append('category', inputCategory);
		formData.append('ingredients', JSON.stringify(listIngredient));
		formData.append('description', inputDesc); */

		try {
			const api = await fetch(`${config.backend_url}/recipes/edit?id=${match.params.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					CSRF_Token: tokenCSRF
				},
				body: JSON.stringify({
					title: inputTitle,
					category: inputCategory,
					ingredients: JSON.stringify(listIngredient),
					description: inputDesc
				})
			});

			if (api.status === 200) history.goBack();
			else if (api.status === 400) {
				const data = await api.json();
				setErrorMessage(data.message);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const formSubmit = e => {
		e.preventDefault();
		apiSubmit();
	};

	if (statusVerifyCSRF === 200 && tokenCSRF && (memberData.group_id === 4 || memberData._id === dataItem.member_id)) {
		return (
			<form className="form" onSubmit={formSubmit} encType="multipart/form-data">
				<div className="container">
					<div className="container_box padding">
						<ul className="form_ul">
							<li>
								<label htmlFor="title" className="input_label">
									Title
								</label>
								<input type="text" id="title" className="input input_text input_full" onChange={handleTitle} value={inputTitle} />
							</li>
							<li>
								<label htmlFor="category" className="input_label">
									Category
								</label>
								<select id="category" className="input input_select input_full" onChange={handleCategory} value={inputCategory}>
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
										console.log({ event, editor, data });
										setInputDesc(data);
									}}
									config={{
										removePlugins: ['Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload'],
										width: 'auto'
									}}
								/>
							</li>
						</ul>

						<IngredientsForm
							listIngredient={listIngredient}
							removeIngredient={removeIngredient}
							handleIngredient={handleIngredient}
							inputIngredient={inputIngredient}
							addIngredient={addIngredient}
							inputIngredientAmount={inputIngredientAmount}
							handleIngredientAmount={handleIngredientAmount}
						/>

						{errorMessage && <div className="message message-error">{errorMessage}</div>}

						<div className="flex flex-ai:center flex-jc:center padding-top">
							<button className="button button_primary" type="submit">
								Edit recipe
							</button>
						</div>
					</div>
				</div>
			</form>
		);
	}

	return <ErrorView code={401}>You don't have access to this page!</ErrorView>;
};

export default RecipeEditView;
