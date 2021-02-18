import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useCSRF } from '../../context/csrf';
import { AuthContextType } from '../../types/contextTypes';
import config from '../../config';
import Loading from '../../components/Loading';
import ErrorView from '../ErrorView';
import Breadcrumb from '../../components/Breadcrumb';
import Error from '../../components/Error';

const RecipesView = () => {
  const { tokenCSRF } = useCSRF() as AuthContextType;

  const { isLoading, isError, data, isSuccess } = useQuery('recipeList', async () => {
    const res = await fetch(`${config.backend_url}/recipes`);
    return res.json();
  });

  if (isSuccess) document.title = `${config.title_page} - Recipes`;

  if (isLoading) return <Loading />;
  if (isError) return <ErrorView code={500}>There was a problem with API connection.</ErrorView>;

  return (
    <div className="container">
      <Breadcrumb>Recipes</Breadcrumb>

      <div className="container_header">
        <h1>Recipes</h1>

        {tokenCSRF && (
          <Link to="/recipes/add" className="text_link:none">
            <button className="button button_important">Add new recipe</button>
          </Link>
        )}
      </div>

      {data.recipe.length > 0 ? (
        <div className="container_wraper">
          <div className="container_wraper_main">
            <div className="container_box">
              <ul className="recipes_ul">
                {data.recipe
                  .map((item: { _id: string; image_url: string; title: string; member_name: string }) => (
                    <li key={item._id}>
                      <Link to={`/recipes/${item._id}`}>
                        <div className="recipes_item">
                          <img src={`${config.backend_url}/uploads/${item.image_url}`} alt={item.title} />
                          <div className="recipes_item_content">
                            <div className="recipes_item_content:title">{item.title}</div>
                            <span>Author: {item.member_name}</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))
                  .reverse()}
              </ul>
            </div>
          </div>

          <div className="container_wraper_widget">Widget</div>
        </div>
      ) : (
        <Error code={404}>You haven't added any content yet.</Error>
      )}
    </div>
  );
};

export default RecipesView;
