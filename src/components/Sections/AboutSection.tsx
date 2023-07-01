import { FC } from 'react';
import Image from 'next/image';

import SectionLayout from '../Layouts/SectionLayout';
import SectionTitle from './Elements/SectionTitle';

import imageRoman from '../../images/Roman.jpg';

interface ITeamMembers {
	photo: string;
	name: string;
	description: string;
}
const teamMembers: ITeamMembers[] = [
	{
		photo: imageRoman.src,
		name: 'Roman',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto cupiditate tempora obcaecati ut aspernatur quasi quia voluptatum tempore animi voluptas voluptatibus veritatis numquam quibusdam, vel autem. Amet qui adipisci distinctio sequi necessitatibus doloribus eos a, harum omnis repellendus. Est accusantium eius voluptatibus voluptate quia aliquam corporis totam quam, inventore cupiditate debitis, iure quisquam nulla in. Eligendi odit harum, iusto sunt laboriosam dolorum voluptatum quidem eius voluptate itaque eaque architecto et minima omnis at suscipit commodi.',
	},
];

const TeamSection: FC = () => {
	return (
		<SectionLayout>
			<SectionTitle title='O mnie' id='o-mnie' />

			{teamMembers.map((el, index) => (
				<div
					key={index}
					className='flex flex-col justify-center items-center w-full sm:mx-4 md:flex-row md:items-start lg:items-center'
				>
					<Image
						src={el.photo}
						alt=''
						height={300}
						width={300}
						className='h-36 w-36 rounded-full object-cover md:mr-6 md:h-48 md:w-48'
					/>
					<div>
						<p className='text-gray-600 text-xl text-center font-bold my-2 dark:text-neutral-200 md:text-2xl md:text-left'>
							{el.name}
						</p>
						<p>{el.description}</p>
					</div>
				</div>
			))}
		</SectionLayout>
	);
};

export default TeamSection;
