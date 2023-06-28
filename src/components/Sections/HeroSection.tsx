import { FC } from 'react';

interface IHeroSection {}

const HeroSection: FC<IHeroSection> = () => {
	return (
		<section
			id='#home'
			className="bg-center bg-no-repeat bg-[url('https://images.pexels.com/photos/14781974/pexels-photo-14781974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-gray-700 bg-blend-multiply bg-cover"
		>
			<div className='px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56'>
				<h1 className='mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl'>
					Zadbaj o swój wygląd!
				</h1>
				<p className='mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48'>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat esse ducimus ullam amet sed adipisci
					consequatur soluta, vero veniam ipsa quia et dolore ab molestias.
				</p>
			</div>
		</section>
	);
};

export default HeroSection;
