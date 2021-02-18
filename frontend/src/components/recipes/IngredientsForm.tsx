import { FC } from 'react';
import { IngredientsFormType } from '../../types/componentsType';

const IngredientsForm: FC<IngredientsFormType> = ({
  inputingredient,
  listIngredients,
  removeIngredient,
  upadateIngredient,
  addIngredient,
  handleInput
}) => {
  return (
    <li>
      <label className="input_label">Ingredients</label>

      {listIngredients.length > 0 ? (
        <ul className="form_ul">
          {listIngredients.map(({ id, text }: { id: string; text: string }) => (
            <li className="flex" key={`item-${id}`}>
              <input className="input input_text flex:11 margin-right" id={id} onChange={upadateIngredient} value={text} />
              <button className="button button_primary" type="button" onClick={() => removeIngredient(id)}>
                X
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="message message-info">You haven't added any ingredients yet.</div>
      )}

      <div className="flex margin-top">
        <input
          type="text"
          className="input input_text flex:11 margin-right"
          onChange={handleInput}
          value={inputingredient}
        />
        <button className="button button_primary" type="button" onClick={addIngredient} disabled={!inputingredient}>
          Add
        </button>
      </div>
    </li>
  );
};

export default IngredientsForm;
