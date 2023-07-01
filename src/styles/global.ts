const globalStyles: { [key: string]: string } = {
	container: 'h-screen flex flex-col justify-center items-center mx-auto p-10',
	h1: 'text-primary font-bold text-2xl mb-2 lg:text-4xl',
	h2: 'text-primary font-bold text-xl mb-2 lg:text-2xl',
	h3: 'font-medium mb2',
	buttonPrimary:
		'bg-primary text-white hover:bg-primary-hover rounded-lg focus:outline-none my-2 px-4 py-2 lg:mx-2 text-center',
	buttonSecondary:
		'text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-content-hover dark:hover:bg-gray-700 my-1 px-4 py-2 lg:mx-2 lg:my-2 text-center',
	visitItem: 'my-4 p-4 rounded-lg border border-neutral-100 dark:border-neutral-600',
	visitItemTitle: 'text-lg font-bold',
};

export default globalStyles;
