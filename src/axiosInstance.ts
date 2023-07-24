import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://barbershop-portal.vercel.app/api',
});

export default instance;
