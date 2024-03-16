import { combineReducers } from 'redux';
import { RequestStatus } from 'enums/RequestStatus';
import { DispatchActionType } from 'enums/DispatchActionType';
import { DispatchAction } from 'types/DispatchAction';

const data = (state = {}, action: DispatchAction) => {
	switch (action.type) {
		case DispatchActionType.CURRENT_USER_REQUESTS:
		case DispatchActionType.CURRENT_TEAM_REQUESTS:
		case DispatchActionType.REQUEST_ACCEPT:
		case DispatchActionType.REQUEST_DECLINE:
		case DispatchActionType.REQUEST_CANCEL:
		case DispatchActionType.REQUEST_OPEN:
			if (action.status == RequestStatus.SUCCESS) {
				return action.data;
			}
	}
	return state;
};

const error = (state = null, action: DispatchAction) => {
	switch (action.type) {
		case DispatchActionType.CURRENT_USER_REQUESTS:
		case DispatchActionType.CURRENT_TEAM_REQUESTS:
		case DispatchActionType.REQUEST_ACCEPT:
		case DispatchActionType.REQUEST_DECLINE:
		case DispatchActionType.REQUEST_CANCEL:
		case DispatchActionType.REQUEST_OPEN:
			if (action.status == RequestStatus.ERROR) {
				return action.data;
			}
	}
	return state;
};

const status = (state = null, action: DispatchAction) => {
	switch (action.type) {
		case DispatchActionType.CURRENT_USER_REQUESTS:
		case DispatchActionType.CURRENT_TEAM_REQUESTS:
		case DispatchActionType.REQUEST_ACCEPT:
		case DispatchActionType.REQUEST_DECLINE:
		case DispatchActionType.REQUEST_CANCEL:
		case DispatchActionType.REQUEST_OPEN:
			return action.status;
	}
	return state;
};

export default combineReducers({
	data,
	error,
	status,
});
