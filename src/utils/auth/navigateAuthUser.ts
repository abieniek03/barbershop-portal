const navigateAuthUser = (rank: string) => {
	return rank === 'admin' ? '/administrator/dashboard' : '/';
};

export default navigateAuthUser;
