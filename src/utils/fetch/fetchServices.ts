import axios from '../../axiosInstance';

const fetchServices = () => {
	const response = axios
		.get('/services')
		.then((res) => res.data)
		.catch(() => {
			const errorInfo = 'Błąd';
			return errorInfo;
		});

	return response;
};

export default fetchServices;
