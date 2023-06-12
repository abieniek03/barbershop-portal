import { FC, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import { FiSun, FiMoon } from 'react-icons/fi';

import styles from './styles';

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
		<button onClick={switchTheme} className={`${styles.switchThemeButton} ${customStyles}`}>
			{currentTheme === 'dark' ? <FiSun /> : <FiMoon />}
		</button>
	);
};

export default SwitchThemeButton;
