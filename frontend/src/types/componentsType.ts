import { ChangeEvent } from 'react';

export type ModalType = {
  isOpen: boolean;
  setIsOpen(isOpen: boolean): void;
};

export type LogoutButtontype = {
  buttonFull?: boolean;
};

export type ErrorType = {
  code: number;
};

export type RecipeIngredientsWidgetType = {
  ingredients: string;
};

export type ActionRecipeItemType = {
  _id: string;
};

export type IngredientsFormType = {
  inputingredient: string;
  listIngredients: [];
  removeIngredient(id: string): void;
  upadateIngredient(e: React.ChangeEvent<HTMLInputElement>): void;
  addIngredient(): void;
  handleInput(e: ChangeEvent): void;
};
