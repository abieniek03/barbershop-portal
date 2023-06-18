import axios from '../../axiosInstance';

const fetchVisits = (params: { [key: string]: string }) => {
	axios
		.post('/visits/select', params)
		.then((res) => console.log(res))
		.catch((error) => console.error(error));
};

export default fetchVisits;
