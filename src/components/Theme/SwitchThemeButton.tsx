import { FC, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import { FiSun, FiMoon } from 'react-icons/fi';

interface ISwitchThemeButton {
	customStyles?: string;
}

const SwitchThemeButton: FC<ISwitchThemeButton> = ({ customStyles }) => {
	const { systemTheme, theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	let currentTheme = theme === 'system' ? systemTheme : theme;

	const switchTheme = () => {
		currentTheme === 'dark' ? setTheme('light') : setTheme('dark');
	};

	return (
		<button
			onClick={switchTheme}
			className={`p-3 mb-2 mr-2 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-primary dark:hover:bg-gray-700 ${customStyles}`}
		>
			{currentTheme === 'dark' ? <FiSun /> : <FiMoon />}
		</button>
	);
};

export default SwitchThemeButton;
