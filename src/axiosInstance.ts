import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://barbershop-portal-zbbumpqbn-abieniek03.vercel.app/api',
});

export default instance;
