export enum DispatchActionType {
	AUTH_REGISTER = 'AUTH_REGISTER',
	AUTH_LOGIN = 'AUTH_LOGIN',
	AUTH_LOGIN_TOKEN = 'AUTH_LOGIN_TOKEN',
	AUTH_VERIFY = 'AUTH_VERIFY',
	AUTH_VERIFY_RESEND = 'AUTH_VERIFY_RESEND',
	AUTH_REQUEST_RESET = 'AUTH_REQUEST_RESET',
	AUTH_RESET_PASSWORD = 'AUTH_RESET_PASSWORD',

	ANALYTICS = 'ANALYTICS',

	TEAMS_VIEW = 'TEAMS_VIEW',
	TEAM_JOIN = 'TEAM_JOIN',
	TEAM_INFO = 'TEAM_INFO',
	TEAM_LEAVE = 'TEAM_LEAVE',
	TEAM_CREATE = 'TEAM_CREATE',
	TEAM_INVITE_BY_EMAIL = 'TEAM_INVITE_BY_EMAIL',
	TEAM_EDIT = 'TEAM_EDIT',
	USER_GET_TEAM = 'USER_GET_TEAM',

	SPONSORS_LIST = 'SPONSORS_LIST',
	SPONSORS_CREATE = 'SPONSORS_CREATE',
	USER_CONFIRM = 'USER_CONFIRM',
	USER_DECLINE_ACCEPTANCE = 'USER_DECLINE_ACCEPTANCE',

	CURRENT_USER_REQUESTS = 'CURRENT_USER_REQUESTS',
	CURRENT_TEAM_REQUESTS = 'CURRENT_TEAM_REQUESTS',
	REQUEST_OPEN = 'REQUEST_OPEN',
	REQUEST_ACCEPT = 'REQUEST_ACCEPT',
	REQUEST_DECLINE = 'REQUEST_DECLINE',
	REQUEST_CANCEL = 'REQUEST_CANCEL',

	// Admin
	GET_USERS = 'GET_USERS',
	GET_PARTICIPANTS = 'GET_PARTICIPANTS',
	USER_PROFILE = 'USER_PROFILE',
	ADMIT_USER = 'ADMIT_USER',
	REJECT_USER = 'REJECT_USER',
	ADMIT_ALL = 'ADMIT_ALL',
	REJECT_ALL = 'REJECT_ALL',
	ADD_ADMIN = 'ADD_ADMIN',
	REMOVE_ADMIN = 'REMOVE_ADMIN',

	// Judge
	ADD_JUDGE = 'ADD_JUDGE',
	REMOVE_JUDGE = 'REMOVE_JUDGE',
	GET_JUDGES = 'GET_JUDGES',

	// Application form
	APPLICATION_UPLOAD_RESUME = 'APPLICATION_UPLOAD_RESUME',
	APPLICATION_MISSING_RESUME = 'APPLICATION_MISSING_RESUME',
	APPLICATION_DISPLAY_NAME_AVAILABLE = 'APPLICATION_DISPLAY_NAME_AVAILABLE',
	APPLICATION_SUBMIT_FORM = 'APPLICATION_SUBMIT_FORM',
	APPLICATION_GET_PROFILE = 'APPLICATION_GET_PROFILE',

	// Save application section data
	APPLICATION_SAVE_BASIC = 'APPLICATION_SAVE_BASIC',
	APPLICATION_SAVE_TRAVEL = 'APPLICATION_SAVE_TRAVEL',
	APPLICATION_SAVE_EXPERIENCE = 'APPLICATION_SAVE_EXPERIENCE',
	APPLICATION_SAVE_DIVERSITY = 'APPLICATION_SAVE_DIVERSITY',
	APPLICATION_SAVE_LOGISTICS = 'APPLICATION_SAVE_LOGISTICS',
	APPLICATION_SAVE_PORTFOLIO = 'APPLICATION_SAVE_PORTFOLIO',
	APPLICATION_SAVE_SCHOOL = 'APPLICATION_SAVE_SCHOOL',
	APPLICATION_SAVE_WORK_AUTH = 'APPLICATION_SAVE_WORK_AUTH',
	APPLICATION_SAVE_CONSENT = 'APPLICATION_SAVE_CONSENT',

	SETTINGS_OPEN_TIME = 'SETTINGS_OPEN_TIME',
	SETTINGS_CLOSE_TIME = 'SETTINGS_CLOSE_TIME',
	SETTINGS_CONFIRM_TIME = 'SETTINGS_CONFIRM_TIME',

	RECRUITER_CREATE = 'RECRUITER_CREATE',

	WAITLIST_STATUS = 'WAITLIST_STATUS',
}
