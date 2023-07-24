import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://barbershop-portal-2vljp9zvw-abieniek03.vercel.app/api',
});

export default instance;
