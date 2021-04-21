import { useEffect, useState, createRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useCSRF } from '../../../context/csrf';
import useIngredientsForm from '../../../hooks/useIngredientsForm';
import useRecipeForm from '../../../hooks/useRecipeForm';
import config from '../../../config';
import IngredientsForm from '../../../components/recipes/IngredientsForm';
import Loading from '../../../components/Loading';
import CategoryList from '../../../components/recipes/CategoryList';
import Breadcrumb from '../../../components/Breadcrumb';

const RecipesAddView = () => {
  const {
    inputTitle,
    inputCategory,
    inputDesc,
    handleTitle,
    handleCategory,
    setInputDesc
  } = useRecipeForm();

  const {
    inputingredient,
    listIngredients,
    removeIngredient,
    upadateIngredient,
    addIngredient,
    handleInput
  } = useIngredientsForm();

  const [inputImage, setInputImage] = useState({});
  const [errorMessageFile, setErrorMessageFile] = useState('');

  useEffect(() => {
    document.title = `${config.title_page} - Add Recipe`;
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const queryClient = useQueryClient();
  const fileInput = createRef();
  const history = useHistory();
  const { tokenCSRF } = useCSRF();

  const { mutateAsync, isLoading } = useMutation(async () => {
    const formData = new FormData();
    formData.append('upload', inputImage);
    formData.append('title', inputTitle);
    formData.append('category', inputCategory);
    formData.append('ingredients', JSON.stringify(listIngredients));
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

  const onSubmit = data => {
    setErrorMessageFile('');

    handleTitle(data.title);
    handleCategory(data.category);
    setInputImage(data.image[0]);

    if (data.image[0].type === 'image/jpeg' || data.image[0].type === 'image/png') {
      mutateAsync();
      queryClient.invalidateQueries('recipeList');
    } else {
      setErrorMessageFile('The file is not a Image!');
    }
  };

  if (isLoading) return <Loading />;

  return (
    <form
      className="form container container:medium"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <Breadcrumb>Add</Breadcrumb>

      <div className="container_box padding">
        <ul className="form_ul">
          <li>
            <label htmlFor="title" className="input_label">
              Title
            </label>
            <input
              type="text"
              id="title"
              className={`input input_text input_full${errors.title ? ' input_error' : ''}`}
              {...register('title', { required: true })}
            />
          </li>

          <li>
            <label htmlFor="category" className="input_label">
              Category
            </label>
            <select
              id="category"
              className="input input_select input_full"
              {...register('category', { required: true })}
            >
              <CategoryList />
            </select>
          </li>

          <li>
            <label htmlFor="image" className="input_label">
              Image
            </label>
            <input
              type="file"
              className={`input input_file input_full${errors.image ? ' input_error' : ''}`}
              id="image"
              accept="image/x-png,image/gif,image/jpeg"
              ref={fileInput}
              {...register('image', { required: true })}
            />

            {errorMessageFile && <div className="message message-error">{errorMessageFile}</div>}
          </li>

          <li>
            <label className="input_label">Description</label>

            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                const data = editor.getData();
                setInputDesc(data);
              }}
              config={{
                ckfinder: {
                  uploadUrl: `${config.backend_url}/recipes/upload-image?csrf=${tokenCSRF}`
                },
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
