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
};
