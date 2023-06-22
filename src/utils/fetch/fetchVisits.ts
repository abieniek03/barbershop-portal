import axios from '../../axiosInstance';

const fetchVisits = (params: { [key: string]: string }) => {
	const response = axios
		.post('/visits/select', params)
		.then((res) => res.data)
		.catch(() => {
			const errorInfo = 'Nie znaleziono';
			return errorInfo;
		});

	return response;
};

export default fetchVisits;
