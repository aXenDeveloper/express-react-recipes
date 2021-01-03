import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import config from '../../../config';

const RecipesAddView = () => {
	const [inputTitle, setInputTitle] = useState('');
	const [inputDesc, setInputDesc] = useState('');
	const [inputCategory, setInputCategory] = useState('breakfast');

	useEffect(() => {
		document.title = `${config.title_page} - Add Recipe`;
	}, []);

	const formSubmit = e => {
		e.preventDefault();
		console.log(inputDesc);
	};

	const handleTitle = e => setInputTitle(e.target.value);
	const handleCategory = e => setInputCategory(e.target.value);

	return (
		<form className="form container" onSubmit={formSubmit}>
			<div className="container_wraper">
				<div className="container_wraper_main container_box padding">
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
								onChange={(event, editor) => {
									const data = editor.getData();
									console.log({ event, editor, data });
									setInputDesc(data);
								}}
							/>
						</li>
					</ul>

					<div className="flex flex-ai:center flex-jc:center padding-top">
						<button className="button button_primary" type="submit">
							Add recipe
						</button>
					</div>
				</div>

				<div className="container_wraper_widget">test</div>
			</div>
		</form>
	);
};

export default RecipesAddView;
