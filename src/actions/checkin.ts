import { DispatchActionType } from 'enums/DispatchActionType';
import { RequestStatus } from 'enums/RequestStatus';
import { RemoteDispatchAction } from 'types/DispatchAction';

export const allCheckInItems = (): RemoteDispatchAction => ({
	type: DispatchActionType.USER_GET_TEAM,
	useAPI: true,
	request: {
		path: '/check-in',
		method: 'GET',
	},
	status: RequestStatus.PENDING,
});
