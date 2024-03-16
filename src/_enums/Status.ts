export enum Status {
	UNVERIFIED = 'UNVERIFIED',
	VERIFIED = 'VERIFIED',
	COMPLETED_PROFILE = 'COMPLETED_PROFILE',
	ADMITTED = 'ADMITTED',
	REJECTED = 'REJECTED',
	CONFIRMED = 'CONFIRMED',
	DECLINED = 'DECLINED',
	WAITLISTED = 'WAITLISTED',
}

/**
 * Returns a more user-friendly string representation of a Status entry
 */
export function statusToString(status: Status): string {
	if (status === Status.COMPLETED_PROFILE) {
		return 'APPLIED';
	} else {
		return status;
	}
}
