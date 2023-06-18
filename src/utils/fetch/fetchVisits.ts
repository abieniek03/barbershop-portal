import axios from '../../axiosInstance';

const fetchVisits = (params: { [key: string]: string }) => {
	axios
		.post('/visits/select/date', params)
		.then((res) => console.log(res))
		.catch((error) => console.error(error));
};

export default fetchVisits;
