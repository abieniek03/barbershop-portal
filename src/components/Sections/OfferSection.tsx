import { FC } from 'react';
import Image from 'next/image';

import SectionLayout from '../Layouts/SectionLayout';
import SectionTitle from './Elements/SectionTitle';

import imageURL from '../../images/offer.jpg';

const offerItem: { title: string; info: string; price: number }[] = [
	{ title: 'Strzyżenie włosów', info: 'Konsultacja, mycie, strzyżenie i układanie włosów.', price: 75 },
	{ title: 'Golenie brzytwą', info: 'Pełne golenie brzytwą.', price: 50 },
	{ title: 'Zarost', info: 'Stylizacja zarostu', price: 60 },
	{ title: 'Kombo', info: 'Konsultacja, mycie, strzyżenie i układanie włosów wraz ze stylizacją zarostu.', price: 120 },
];

const OfferSection: FC = () => {
	return (
		<SectionLayout>
			<div className='lg:flex lg:items-center'>
				<Image
					src={imageURL}
					width={500}
					height={200}
					alt='Picture of the author'
					className='mb-10 rounded-lg lg:mb-0 lg:mr-16 w-full lg:max-w-[400px]'
				/>

				<div>
					<div className='mb-8'>
						<SectionTitle title='Oferta' id='oferta' />
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nisi perspiciatis officiis, cupiditate
							eligendi ullam numquam eos reiciendis, error commodi adipisci animi quaerat nam temporibus! Pariatur ullam
							nemo ab aspernatur autem corporis maxime quibusdam temporibus! Tempora enim facere eaque suscipit eum
							cupiditate unde molestiae magni eius, necessitatibus architecto illum sunt adipisci quidem? Qui, commodi
							rem.
						</p>
					</div>
					<div>
						<SectionTitle title='Cennik' />
						<div className='mt-2'>
							{offerItem.map((el, index) => (
								<div key={index} className='flex justify-between mb-8'>
									<div className='max-w-[350px]'>
										<p className='text-xl font-bold'>{el.title}</p>
										<p className='text-sm text-gray-800 dark:text-neutral-200'> {el.info}</p>
									</div>
									<p className='text-xl font-bold text-primary'>{el.price}PLN</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</SectionLayout>
	);
};

export default OfferSection;
