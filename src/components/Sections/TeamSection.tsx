import { FC } from 'react';
import Image from 'next/image';

import SectionLayout from '../Layouts/SectionLayout';
import SectionTitle from './Elements/SectionTitle';

import imageRoman from '../../images/team/Roman.jpg';
import imageKarim from '../../images/team/Karim.jpg';
import imageMateusz from '../../images/team/Mateusz.jpg';
import imageAgata from '../../images/team/Agata.jpg';

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
			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus dignissimos id vel, mollitia voluptate ratione suscipit exercitationem dolores. ',
	},

	{
		photo: imageAgata.src,
		name: 'Agata',
		description:
			'	Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tenetur, labore quae repudiandae eligendi delectus consequatur non.',
	},
];

const TeamSection: FC = () => {
	return (
		<SectionLayout>
			<SectionTitle title='Zespół' id='zespol' />
			<div className='flex flex-col items-center lg:flex-row'>
				{teamMembers.map((el, index) => (
					<div key={index} className='flex justify-center items-center my-4 w-full sm:mx-4 md:mx-4 lg:mr-4'>
						<Image
							src={el.photo}
							alt=''
							height={300}
							width={300}
							className='h-36 w-36 mr-4 rounded-full object-cover lg:mr-6'
						/>
						<div>
							<p className='text-gray-600 text-xl font-bold mt-4 dark:text-neutral-200 lg:text-2xl'>{el.name}</p>
							<p>{el.description}</p>
						</div>
					</div>
				))}
			</div>
		</SectionLayout>
	);
};

export default TeamSection;
