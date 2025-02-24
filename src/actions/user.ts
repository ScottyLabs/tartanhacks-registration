import { DispatchActionType } from 'enums/DispatchActionType';
import { RequestStatus } from 'enums/RequestStatus';
import { DispatchAction, RemoteDispatchAction } from 'types/DispatchAction';

export const getOwnTeam = (): RemoteDispatchAction => ({
	type: DispatchActionType.USER_GET_TEAM,
	useAPI: true,
	request: {
		path: '/user/team',
		method: 'GET',
	},
	status: RequestStatus.PENDING,
});
export const getProfile = (id: string): DispatchAction => ({
	type: DispatchActionType.USER_PROFILE,
	useAPI: true,
	request: {
		path: `/users/${id}/profile/`,
		method: 'GET',
	},
	status: RequestStatus.PENDING,
});

export const getUsers = (): DispatchAction => ({
	type: DispatchActionType.GET_USERS,
	useAPI: true,
	request: {
		path: '/users',
		method: 'GET',
	},
	status: RequestStatus.PENDING,
});

export const getParticipants = (): DispatchAction => ({
	type: DispatchActionType.GET_PARTICIPANTS,
	useAPI: true,
	request: {
		path: '/participants',
		method: 'GET',
	},
	status: RequestStatus.PENDING,
});

export const getTeams = (): DispatchAction => ({
	type: DispatchActionType.TEAMS_VIEW,
	useAPI: true,
	request: {
		path: '/teams',
		method: 'GET',
	},
	status: RequestStatus.PENDING,
});
export const admitUser = (id: string): DispatchAction => ({
	type: DispatchActionType.ADMIT_USER,
	useAPI: true,
	request: {
		path: `/users/${id}/admit/`,
		method: 'POST',
	},
	status: RequestStatus.PENDING,
});

export const rejectUser = (id: string): DispatchAction => ({
	type: DispatchActionType.REJECT_USER,
	useAPI: true,
	request: {
		path: `/users/${id}/reject/`,
		method: 'POST',
	},
	status: RequestStatus.PENDING,
});

export const admitAll = (): DispatchAction => ({
	type: DispatchActionType.ADMIT_ALL,
	useAPI: true,
	request: {
		path: '/users/admit/all',
		method: 'POST',
	},
	status: RequestStatus.PENDING,
});

export const rejectAll = (): DispatchAction => ({
	type: DispatchActionType.REJECT_ALL,
	useAPI: true,
	request: {
		path: '/users/reject/all',
		method: 'POST',
	},
	status: RequestStatus.PENDING,
});

export const confirm = (
	signatureLiability: boolean,
	willMentor: boolean,
): DispatchAction => ({
	type: DispatchActionType.USER_CONFIRM,
	useAPI: true,
	request: {
		path: '/user/confirmation',
		method: 'PUT',
		body: {
			signatureLiability,
			willMentor,
		},
	},
	status: RequestStatus.PENDING,
});

export const declineAcceptance = (): DispatchAction => ({
	type: DispatchActionType.USER_DECLINE_ACCEPTANCE,
	useAPI: true,
	request: {
		path: '/user/decline',
		method: 'PUT',
	},
	status: RequestStatus.PENDING,
});

export const addAdmin = (id: string): DispatchAction => ({
	type: DispatchActionType.ADD_ADMIN,
	useAPI: true,
	request: {
		path: `/admin/${id}`,
		method: 'POST',
	},
	status: RequestStatus.PENDING,
});

export const removeAdmin = (id: string): DispatchAction => ({
	type: DispatchActionType.REMOVE_ADMIN,
	useAPI: true,
	request: {
		path: `/admin/remove/${id}`,
		method: 'POST',
	},
	status: RequestStatus.PENDING,
});

export const addJudges = (emails: string[]): DispatchAction => ({
	type: DispatchActionType.ADD_JUDGE,
	useAPI: true,
	request: {
		path: `/judges/`,
		method: 'POST',
		body: emails,
	},
	status: RequestStatus.PENDING,
});

export const removeJudges = (emails: string[]): DispatchAction => ({
	type: DispatchActionType.REMOVE_JUDGE,
	useAPI: true,
	request: {
		path: `/judges/remove/`,
		method: 'POST',
		body: emails,
	},
	status: RequestStatus.PENDING,
});
