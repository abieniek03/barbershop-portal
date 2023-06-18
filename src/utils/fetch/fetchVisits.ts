import axios from '../../axiosInstance';

const fetchVisits = (params: { [key: string]: string }) => {
	let response;
	return (response = axios
		.post('/visits/select', params)
		.then((res) => res.data)
		.catch(() => {
			const errorInfo = 'Nie znaleziono';
			return errorInfo;
		}));
};

export default fetchVisits;
