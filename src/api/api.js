import axios from 'axios';

let base = 'http://127.0.0.1:2334';	// 根据MCDog后端配置文件中对应设置

export const requestLogin = params => {

	return axios.post(`${base}/login`, {}, {
		auth: params
	})
	.then(res => res)
	.catch(err => err.response);
};

export const getApiList = () => {
	return axios.get(`${base}/services`, {auth: JSON.parse(sessionStorage.getItem('user'))});
};

export const changeState = (service) => {
	let url = `${base}/service/` + service.id + '/' + (service.state?1:0);
	return axios.put(url, {}, {auth: JSON.parse(sessionStorage.getItem('user'))});
};

export const deleteApi = (service) => {
	let url = `${base}/service/` + service.id;
	return axios.delete(url, {auth: JSON.parse(sessionStorage.getItem('user'))});
};

export const saveApi = (dsl) => {
	return axios.post(`${base}/services`, dsl, {
		auth: JSON.parse(sessionStorage.getItem('user')),
		headers: {'Content-Type': 'text/plain'},
	});
};
