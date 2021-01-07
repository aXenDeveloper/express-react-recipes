import { FC, useEffect, useState } from 'react';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import config from '../config';
import SwiperVideo from '../assets/video-banner.mp4';
import Modal from '../components/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const HomeView: FC = () => {
	useEffect(() => {
		document.title = config.title_page;
	}, []);

	const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

	SwiperCore.use([Autoplay, Navigation]);

	return (
		<>
			<section className="swiper">
				<div className="swiper_video">
					<video autoPlay muted loop id="myVideo">
						<source src={SwiperVideo} type="video/mp4" />
					</video>
				</div>

				<Swiper navigation autoplay={{ delay: 3000, disableOnInteraction: false }}>
					<SwiperSlide>
						<div className="swiper_slide">
							<div className="swiper_slide:title">Lifehack in Kitchen #1</div>
							<div className="swiper_slide:desc">
								Freeze soft cheese like fresh mozzarella for 15 minutes to make it easier to slice or shred.
							</div>
						</div>
					</SwiperSlide>

					<SwiperSlide>
						<div className="swiper_slide">
							<div className="swiper_slide:title">Lifehack in Kitchen #2</div>
							<div className="swiper_slide:desc">
								No need to peel garlic cloves if you have a garlic press. Just pop the whole clove in the hopper, press, and then
								remove the empty peel.
							</div>
						</div>
					</SwiperSlide>

					<SwiperSlide>
						<div className="swiper_slide">
							<div className="swiper_slide:title">Lifehack in Kitchen #3</div>
							<div className="swiper_slide:desc">
								To prevent quinoa from falling through your fine mesh sieve while rinsing, run the sieve under water first to create a
								barrier between the quinoa and mesh.
							</div>
						</div>
					</SwiperSlide>

					<SwiperSlide>
						<div className="swiper_slide">
							<div className="swiper_slide:title">Lifehack in Kitchen #4</div>
							<div className="swiper_slide:desc">
								To ensure chicken breasts cook evenly from top to bottom, place the chicken on a cutting board then cover with Glad
								Press’n’ Seal or saran wrap, and then whack it with a rolling pin or meat mallet until the chicken is the same
								thickness.
							</div>
						</div>
					</SwiperSlide>
				</Swiper>
			</section>

			<div className="container">Home</div>

			<button onClick={() => setIsOpenPopup(true)}>Open</button>
			<Modal isOpen={isOpenPopup} setIsOpen={setIsOpenPopup}>
				<FontAwesomeIcon icon={faExclamationTriangle} />
				<div className="modal_content:text">Debil</div>
				<div className="flex flex-ai:center flex-jc:center">
					<button className="button button_primary margin-right" onClick={() => setIsOpenPopup(false)}>
						Ok
					</button>
					<button className="button" onClick={() => setIsOpenPopup(false)}>
						Ok, ale bardziej
					</button>
				</div>
			</Modal>
		</>
	);
};

export default HomeView;
