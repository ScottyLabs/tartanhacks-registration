import { Status } from 'enums/Status';

export type Team = {
	_id: string;
	admin: TeamMember;
	description: string;
	members: Array<TeamMember>;
	name: string;
};

export type TeamMember = {
	_id: string;
	email: string;
	firstName: string;
	lastName: string;
	admin: boolean;
	company?: string;
	password: string;
	status: Status;
};
