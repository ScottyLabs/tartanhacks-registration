import { DispatchActionType } from 'enums/DispatchActionType';
import { RequestStatus } from 'enums/RequestStatus';
import { DispatchAction } from 'types/DispatchAction';

export const list = (): DispatchAction => ({
	type: DispatchActionType.GET_JUDGES,
	useAPI: true,
	request: {
		path: '/judges',
		method: 'GET',
	},
	status: RequestStatus.PENDING,
});
