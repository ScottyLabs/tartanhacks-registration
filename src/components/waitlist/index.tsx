import { Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from 'src/actions';

export default function WaitlistAlert({
	completedProfile,
}: {
	completedProfile: boolean;
}) {
	const dispatch = useDispatch();
	const [waitlistStatus, setWaitlistStatus] = useState(false);

	useEffect(() => {
		const getWaitlistStatus = async () => {
			const { data } = await dispatch(
				actions.settings.getWaitlistStatus(),
			);
			setWaitlistStatus(!!data.waitlist);
		};
		getWaitlistStatus();
	}, []);

	if (!waitlistStatus) {
		return null;
	}

	return completedProfile ? (
		<Alert
			severity="error"
			style={{
				marginTop: '20px',
			}}
		>
			Unfortunately, due to overwhelming demand, we have reached our
			capacity for TartanHacks 2024. We will process the waitlist and let
			you know by February 3rd, 10pm EST.
		</Alert>
	) : (
		<Alert
			severity="error"
			style={{
				marginTop: '20px',
			}}
		>
			Unfortunately, due to overwhelming demand, we have reached our
			capacity for TartanHacks 2024. If you&apos;d like to be placed on a
			waitlist, please complete the registration process.
		</Alert>
	);
}
