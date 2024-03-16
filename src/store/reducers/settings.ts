import { combineReducers } from 'redux';
import { RequestStatus } from 'enums/RequestStatus';
import { DispatchActionType } from 'enums/DispatchActionType';
import { DispatchAction } from 'types/DispatchAction';

const openTime = (state = {}, action: DispatchAction) => {
	switch (action.type) {
		case DispatchActionType.SETTINGS_OPEN_TIME:
			if (action.status == RequestStatus.SUCCESS) {
				return new Date(action.data);
			}
	}
	return state;
};

const closeTime = (state = {}, action: DispatchAction) => {
	switch (action.type) {
		case DispatchActionType.SETTINGS_CLOSE_TIME:
			if (action.status == RequestStatus.SUCCESS) {
				return new Date(action.data);
			}
	}
	return state;
};

const confirmTime = (state = {}, action: DispatchAction) => {
	switch (action.type) {
		case DispatchActionType.SETTINGS_CONFIRM_TIME:
			if (action.status == RequestStatus.SUCCESS) {
				return new Date(action.data);
			}
	}
	return state;
};

const waitlistStatus = (state = {}, action: DispatchAction) => {
	switch (action.type) {
		case DispatchActionType.WAITLIST_STATUS:
			if (action.status == RequestStatus.SUCCESS) {
				return action.data;
			}
	}
	return state;
};

const error = (state = null, action: DispatchAction) => {
	switch (action.type) {
		case DispatchActionType.SETTINGS_OPEN_TIME:
		case DispatchActionType.SETTINGS_CLOSE_TIME:
		case DispatchActionType.SETTINGS_CONFIRM_TIME:
			if (action.status == RequestStatus.ERROR) {
				return action.data;
			}
	}
	return state;
};

const status = (state = null, action: DispatchAction) => {
	switch (action.type) {
		case DispatchActionType.SETTINGS_OPEN_TIME:
		case DispatchActionType.SETTINGS_CLOSE_TIME:
		case DispatchActionType.SETTINGS_CONFIRM_TIME:
			return action.status;
	}
	return state;
};

export default combineReducers({
	openTime,
	closeTime,
	confirmTime,
	waitlistStatus,
	error,
	status,
});
