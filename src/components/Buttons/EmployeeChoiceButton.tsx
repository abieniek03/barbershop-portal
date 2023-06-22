import { FC, useState, useEffect, MouseEvent } from 'react';
import Image from 'next/image';
import avatar from '@/images/team/Agata.jpg';

const EmployeeChoiceButton: FC<{ firstName?: string }> = ({ firstName }) => {
	const [imageSrc, setImageSrc] = useState<string>('');
	const [selectedEmployee, setSelectedEmployee] = useState<string>('');

	useEffect(() => {
		const loadImage = async () => {
			try {
				const image = await import(`@/images/team/${firstName}.jpg`);
				setImageSrc(image);
			} catch (error) {
				console.error(`Nie udało się załadować zdjęcia ${firstName}.jpg:`, error);
			}
		};

		loadImage();
	}, [firstName]);

	const removeSelectedClass = (element: MouseEvent<HTMLButtonElement>) => {
		const buttons = document.querySelectorAll('.selected-employee');
		buttons.forEach((button) => {
			button.classList.remove('selected-employee');
		});

		if (element.currentTarget.firstChild instanceof HTMLElement) {
			element.currentTarget.firstChild.classList.add('selected-employee');
		}
	};

	return (
		<button
			onClick={(e) => {
				removeSelectedClass(e);
				setSelectedEmployee(e.currentTarget.lastChild?.textContent || '');
			}}
			className='flex flex-col justify-center items-center mx-2 first:ml-0 last:mr-0'
		>
			<Image src={imageSrc || ''} alt='' height={100} width={100} className={`h-16 w-16 mt-2 rounded-full `} />
			<p className='mt-1'>{firstName}</p>
		</button>
	);
};

export default EmployeeChoiceButton;
