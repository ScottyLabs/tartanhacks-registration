import { DispatchActionType } from 'enums/DispatchActionType';
import { RequestStatus } from 'enums/RequestStatus';
import { DispatchAction } from 'types/DispatchAction';

export const get = (): DispatchAction => ({
	type: DispatchActionType.ANALYTICS,
	useAPI: true,
	request: {
		path: '/analytics',
		method: 'GET',
	},
	status: RequestStatus.PENDING,
});
