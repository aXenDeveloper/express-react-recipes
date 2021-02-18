import { FC } from 'react';
import { RecipeIngredientsWidgetType } from '../../types/componentsType';

const RecipeIngredientsWidget: FC<RecipeIngredientsWidgetType> = ({ ingredients }) => {
  const ingredientsJSON: [] = JSON.parse(ingredients);

  return (
    <div className="container_box">
      <div className="container_title">
        <h2>Ingredients</h2>
      </div>

      <div className="padding">
        {ingredientsJSON.length > 0 ? (
          <>
            {ingredientsJSON.map(({ id, text }) => (
              <div key={id} id={id}>
                {text}
              </div>
            ))}
          </>
        ) : (
          <div className="message message-error">The author has not added any content here.</div>
        )}
      </div>
    </div>
  );
};

export default RecipeIngredientsWidget;
