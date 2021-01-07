import React, { useState, useEffect, createRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import uniqid from 'uniqid';
import { useCSRF } from '../../context/csrf';
import config from '../../config';

import IngredientsForm from '../../components/IngredientsForm';
import ErrorView from '../ErrorView';

const RecipesAddView = ({ history }) => {
	const { tokenCSRF, statusVerifyCSRF } = useCSRF();

	const fileInput = createRef();
	const [inputTitle, setInputTitle] = useState('');
	const [inputDesc, setInputDesc] = useState('');
	const [inputCategory, setInputCategory] = useState('breakfast');
	const [inputImage, setInputImage] = useState({});

	const [inputIngredient, setInputIngredient] = useState('');
	const [inputIngredientAmount, setInputIngredientAmount] = useState(0);
	const [listIngredient, setListIngredient] = useState([]);

	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		document.title = `${config.title_page} - Add Recipe`;
	}, []);

	const addRecipeAPI = async () => {
		const formData = new FormData();
		formData.append('productImage', inputImage);
		formData.append('title', inputTitle);
		formData.append('category', inputCategory);
		formData.append('ingredients', JSON.stringify(listIngredient));
		formData.append('description', inputDesc);

		try {
			const api = await fetch(`${config.backend_url}/recipes/add`, {
				method: 'POST',
				headers: {
					CSRF_Token: tokenCSRF
				},
				body: formData
			});
			const data = await api.json();

			if (api.status === 200) {
				history.push(`/recipes/${data.recipe_id}`);
			} else if (api.status === 400) setErrorMessage(data.message);
		} catch (err) {
			console.error(err);
		}
	};

	const formSubmit = e => {
		e.preventDefault();
		addRecipeAPI();
	};

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

	const removeIngredient = id => setListIngredient(listIngredient.filter(el => el.id !== id));

	const handleTitle = e => setInputTitle(e.target.value);
	const handleCategory = e => setInputCategory(e.target.value);
	const handleIngredient = e => setInputIngredient(e.target.value);
	const handleIngredientAmount = e => setInputIngredientAmount(e.target.value);

	const handleImage = e => setInputImage(e.target.files[0]);

	if (statusVerifyCSRF !== 200) return <ErrorView code={401}>You don't have access to this page!</ErrorView>;

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
							<label htmlFor="image" className="input_label">
								Image
							</label>
							<input type="file" className="input input_file input_full" id="image" ref={fileInput} onChange={handleImage} />
						</li>
						<li>
							<CKEditor
								editor={ClassicEditor}
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
							Add recipe
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default RecipesAddView;
