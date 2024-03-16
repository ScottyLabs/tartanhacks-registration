import axios, { Method } from 'axios';
import { RemoteDispatchAction } from 'types/DispatchAction';

/**
 * send an axios request
 * doesn't support actions with method FILE
 * @param action details of the request
 * @param accessToken the user's accessToken cookie
 */
export default function fetchData(
	action: RemoteDispatchAction,
	accessToken: string,
): Promise<any> {
	return axios({
		method: action.request.method as Method, // method must not be FILE
		url: `${process.env.BACKEND_URL}${action.request.path}`,
		headers: {
			'x-access-token': accessToken,
		},
		data: action.request.body ?? undefined,
	}).then((res) => res.data);
}
