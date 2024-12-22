import {
	CMUCollege,
	CollegeLevel,
	Ethnicity,
	Gender,
	HackathonExperience,
	Region,
	ShirtSize,
	WorkPermission,
} from 'enums/Profile';

export interface BasicFields {
	displayName: string;
	firstName: string;
	middleName?: string;
	lastName: string;
	gender: Gender;
	genderOther?: string;
	ethnicity: Ethnicity;
	ethnicityOther?: string;
	age?: number;
	city?: string;
	country?: string;
}

export interface SchoolFields {
	school: string;
	college?: CMUCollege;
	collegeLevel: CollegeLevel;
	graduationYear: string;
	major: string;
}

export interface ExperienceFields {
	hackathonExperience: HackathonExperience;
}

export interface WorkAuthorizationFields {
	workPermission: WorkPermission;
	workLocation?: string;
	sponsorRanking: string[];
}

export interface PortfolioFields {
	github: string;
	linkedin?: string;
	resume: string;
	design?: string;
	website?: string;
}

export interface TravelFields {
	wantsTravelReimbursement: boolean;
	travelDetails?: string;
}

export interface LogisticsFields {
	dietaryRestrictions?: string[];
	shirtSize: ShirtSize;
	wantsHardware: boolean;
	address: string;
	region: Region;
	phoneNumber: string;
	attendingPhysically: boolean;
	notes?: string;
}

export type ApplicationForm = BasicFields &
	SchoolFields &
	ExperienceFields &
	WorkAuthorizationFields &
	PortfolioFields &
	TravelFields &
	LogisticsFields;
