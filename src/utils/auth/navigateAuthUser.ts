const navigateAuthUser = (rank: string) => {
	return rank === 'admin' ? '/dashboard' : '/';
};

export default navigateAuthUser;
