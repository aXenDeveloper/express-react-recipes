import { FC, useEffect } from 'react';
import config from '../config';
import SwiperHome from '../components/swiper/SwiperHome';

const HomeView: FC = () => {
	useEffect(() => {
		document.title = config.title_page;
	}, []);

	return (
		<>
			<SwiperHome />

			<div className="container">Home</div>
		</>
	);
};

export default HomeView;
