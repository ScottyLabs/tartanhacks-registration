import axios, { AxiosError } from 'axios';
import { DispatchAction, RemoteDispatchAction } from 'types/DispatchAction';
import { RequestStatus } from 'enums/RequestStatus';
import { Middleware } from 'redux';
import FormData from 'form-data';

/**
 * Middleware to send calls to the backend from DispatchActions, as necessary
 */
const apiMiddleware: Middleware<any, any> =
	({ dispatch }) =>
	(next) =>
	async (action: DispatchAction): Promise<any> => {
		const { type, useAPI } = action;
		if (!useAPI) {
			next(action);
			return;
		}

		const { request } = action as RemoteDispatchAction;

		if (!request) {
			throw new Error('Missing request in dispatch for ' + type);
		}

		// Start API call. Mark request as pending
		dispatch({ type, status: RequestStatus.PENDING });

		// Initialize request params
		const { path, method, body } = request;
		const url = `${process.env.BACKEND_URL}${path}`;
		const accessToken = window.localStorage.getItem('accessToken');

		const options = {
			url,
			method: method === 'FILE' ? 'POST' : method,
			headers: {
				'x-access-token': accessToken,
			},
			data: body,
		};

		if (method === 'FILE') {
			// Attach files
			const formData = new FormData();
			formData.append('file', body);

			options.data = formData;
		}

		try {
			// Send request
			const response = await axios(options);
			const { data } = response;
			// Mark request status as success with resolved data
			dispatch({ type, status: RequestStatus.SUCCESS, data });
			return Promise.resolve({
				type,
				status: RequestStatus.SUCCESS,
				data,
			});
		} catch (err: any) {
			// Mark request status as error
			if (axios.isAxiosError(err)) {
				const serverMessage = (err as AxiosError).response?.data
					?.message;
				const axiosMessage = (err as AxiosError).message;
				const message =
					serverMessage ?? axiosMessage ?? JSON.stringify(err);
				const action: DispatchAction = {
					type,
					useAPI: false,
					status: RequestStatus.ERROR,
					data: message,
				};
				dispatch(action);
				return Promise.reject(action);
			} else {
				console.error(err);
				const action: DispatchAction = {
					type,
					useAPI: false,
					status: RequestStatus.ERROR,
					data: JSON.stringify(err),
				};
				dispatch(action);
				return Promise.reject(action);
			}
		}
	};

export default apiMiddleware;
