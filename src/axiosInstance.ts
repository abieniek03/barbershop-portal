import axios from "axios";

const instance = axios.create({
	baseURL: "https://barber.abwebproject.com/api",
});

export default instance;
