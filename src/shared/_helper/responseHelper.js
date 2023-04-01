import router from '../../routes';

export function responseHandler(status) {
	if (status === 401) {
		router.push({ path: '/auth/login' });
		sessionStorage.clear();
	}
}
