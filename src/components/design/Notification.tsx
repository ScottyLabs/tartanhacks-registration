import { Alert, Snackbar } from '@mui/material';
import { SyntheticEvent } from 'react';

export default function Notification(props: any) {
	const { notify, setNotify } = props;

	const handleClose = (
		event: Event | SyntheticEvent<any, Event>,
		reason?: string,
	) => {
		if (reason === 'clickaway') {
			return;
		}
		setNotify({
			...notify,
			isOpen: false,
		});
	};

	return (
		<div>
			<Snackbar
				open={notify.isOpen}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert
					severity={notify.type}
					onClose={handleClose}
					variant="filled"
				>
					{notify.message}
				</Alert>
			</Snackbar>
		</div>
	);
}
