import { DispatchActionType } from 'enums/DispatchActionType';
import { RequestStatus } from 'enums/RequestStatus';
import { DispatchAction, RemoteDispatchAction } from 'types/DispatchAction';

export const register = (email: string, password: string): DispatchAction => ({
	type: DispatchActionType.AUTH_REGISTER,
	useAPI: true,
	request: {
		path: '/auth/register',
		method: 'POST',
		body: { email, password },
	},
	status: RequestStatus.PENDING,
});

export const verify = (token: string): DispatchAction => ({
	type: DispatchActionType.AUTH_VERIFY,
	useAPI: true,
	request: {
		path: `/auth/verify/${token}`,
		method: 'GET',
	},
	status: RequestStatus.PENDING,
});

export const resendVerification = (email: string): DispatchAction => ({
	type: DispatchActionType.AUTH_VERIFY_RESEND,
	useAPI: true,
	request: {
		path: '/auth/verify/resend',
		method: 'POST',
		body: {
			email,
		},
	},
	status: RequestStatus.PENDING,
});

export const login = (email?: string, password?: string): DispatchAction => ({
	type: DispatchActionType.AUTH_LOGIN,
	useAPI: true,
	request: {
		path: '/auth/login',
		method: 'POST',
		body: { email, password },
	},
	status: RequestStatus.PENDING,
});

export const loginWithToken = (): RemoteDispatchAction => ({
	type: DispatchActionType.AUTH_LOGIN_TOKEN,
	useAPI: true,
	request: {
		path: '/auth/login',
		method: 'POST',
	},
	status: RequestStatus.PENDING,
});

export const requestReset = (email: string): DispatchAction => ({
	type: DispatchActionType.AUTH_REQUEST_RESET,
	useAPI: true,
	request: {
		path: '/auth/request-reset',
		method: 'POST',
		body: { email },
	},
	status: RequestStatus.PENDING,
});

export const resetPassword = (
	token: string,
	password: string,
): DispatchAction => ({
	type: DispatchActionType.AUTH_RESET_PASSWORD,
	useAPI: true,
	request: {
		path: '/auth/reset/password',
		method: 'POST',
		body: { token, password },
	},
	status: RequestStatus.PENDING,
});
