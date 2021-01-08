import { useEffect, useState, createRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import uniqid from 'uniqid';
import { useCSRF } from '../../context/csrf';
import config from '../../config';

import IngredientsForm from '../../components/IngredientsForm';
import Loading from '../../components/Loading';

const RecipesAddView = () => {
	useEffect(() => {
		document.title = `${config.title_page} - Add Recipe`;
	}, []);

	const [inputTitle, setInputTitle] = useState('');
	const [inputCategory, setInputCategory] = useState('breakfast');
	const [inputImage, setInputImage] = useState({});
	const [inputDesc, setInputDesc] = useState('');
	const [listIngredient, setListIngredient] = useState([]);

	const [inputIngredientAmount, setInputIngredientAmount] = useState(0);
	const [inputIngredient, setInputIngredient] = useState('');

	const { register, handleSubmit, errors } = useForm();
	const queryClient = useQueryClient();
	const fileInput = createRef();
	const history = useHistory();
	const { tokenCSRF } = useCSRF();

	const { mutateAsync, isLoading } = useMutation(async newTodo => {
		const formData = new FormData();
		formData.append('productImage', inputImage);
		formData.append('title', inputTitle);
		formData.append('category', inputCategory);
		formData.append('ingredients', JSON.stringify(listIngredient));
		formData.append('description', inputDesc);

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
		}

		return data;
	});

	const onSubmit = async data => {
		await mutateAsync();
		queryClient.invalidateQueries('recipeList');
	};

	const handleTitle = e => setInputTitle(e.target.value);
	const handleCategory = e => setInputCategory(e.target.value);
	const handleImage = e => setInputImage(e.target.files[0]);
	const handleIngredient = e => setInputIngredient(e.target.value);
	const handleIngredientAmount = e => setInputIngredientAmount(e.target.value);

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

	if (isLoading) return <Loading />;

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
							name="title"
							id="title"
							className={`input input_text input_full${errors.title ? ' input_error' : ''}`}
							onChange={handleTitle}
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
						<label htmlFor="image" className="input_label">
							Image
						</label>
						<input
							type="file"
							name="image"
							className={`input input_file input_full${errors.image ? ' input_error' : ''}`}
							id="image"
							onChange={handleImage}
							ref={register({ required: true, fileInput })}
						/>
					</li>

					<li>
						<CKEditor
							editor={ClassicEditor}
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
						listIngredient={listIngredient}
						removeIngredient={removeIngredient}
						handleIngredient={handleIngredient}
						inputIngredient={inputIngredient}
						addIngredient={addIngredient}
						inputIngredientAmount={inputIngredientAmount}
						handleIngredientAmount={handleIngredientAmount}
					/>
				</ul>

				<div className="flex flex-ai:center flex-jc:center padding-top">
					<button className="button button_primary" type="submit">
						Add recipe
					</button>
				</div>
			</div>
		</form>
	);
};

export default RecipesAddView;
