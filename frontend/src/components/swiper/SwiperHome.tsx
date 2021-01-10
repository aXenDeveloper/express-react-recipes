import { FC } from 'react';
import 'swiper/swiper.scss';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperVideo from '../../assets/video-banner.mp4';

const SwiperHome: FC = () => {
	SwiperCore.use([Autoplay, Navigation]);

	return (
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
							No need to peel garlic cloves if you have a garlic press. Just pop the whole clove in the hopper,
							press, and then remove the empty peel.
						</div>
					</div>
				</SwiperSlide>

				<SwiperSlide>
					<div className="swiper_slide">
						<div className="swiper_slide:title">Lifehack in Kitchen #3</div>
						<div className="swiper_slide:desc">
							To prevent quinoa from falling through your fine mesh sieve while rinsing, run the sieve under
							water first to create a barrier between the quinoa and mesh.
						</div>
					</div>
				</SwiperSlide>

				<SwiperSlide>
					<div className="swiper_slide">
						<div className="swiper_slide:title">Lifehack in Kitchen #4</div>
						<div className="swiper_slide:desc">
							To ensure chicken breasts cook evenly from top to bottom, place the chicken on a cutting board
							then cover with Glad Press’n’ Seal or saran wrap, and then whack it with a rolling pin or meat
							mallet until the chicken is the same thickness.
						</div>
					</div>
				</SwiperSlide>
			</Swiper>
		</section>
	);
};

export default SwiperHome;
