import { RequestStatus } from 'enums/RequestStatus';
import {
	BasicFields,
	DiversityFields,
	TravelFields,
	ExperienceFields,
	LogisticsFields,
	PortfolioFields,
	SchoolFields,
	WorkAuthorizationFields,
	ConsentFields
} from './ApplicationForm';

export interface RootState {
	accounts: {
		data: any;
		status: RequestStatus;
		error: string;
	};
	teams: {
		data: any;
		status: RequestStatus;
		error: string;
	};
	user: {
		data: any;
		status: RequestStatus;
		error: string;
	};
	sponsors: {
		data: any;
		status: RequestStatus;
		error: string;
	};
	settings: {
		openTime: Date;
		closeTime: Date;
		confirmTime: Date;
		status: RequestStatus;
		error: string;
	};
	application: {
		status: RequestStatus;
		error: string;
		resume: string;
		basic: BasicFields;
		travel: TravelFields;
		experience: ExperienceFields;
		diversity: DiversityFields;
		logistics: LogisticsFields;
		portfolio: PortfolioFields;
		school: SchoolFields;
		workAuth: WorkAuthorizationFields;
		consent: ConsentFields;
		fetchedProfile: boolean;
	};
	requests: {
		data: any;
		status: RequestStatus;
		error: string;
	};
}
