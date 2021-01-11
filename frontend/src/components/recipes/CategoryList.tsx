import { FC } from 'react';

const CategoryList: FC = () => {
	return (
		<>
			<option value="breakfast">Śniadanie</option>
			<option value="dinner">Obiad</option>
			<option value="salads">Salads</option>
			<option value="pizza">Pizza</option>
			<option value="cakes">Ciasta i desery</option>
			<option value="icecream">Lody</option>
		</>
	);
};

export default CategoryList;
