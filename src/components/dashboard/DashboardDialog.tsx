import {
	Button,
	CircularProgress,
	Collapse,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Link,
	Snackbar,
	Typography,
} from '@mui/material';
import Computer from '@mui/icons-material/Computer';
import { Alert } from '@mui/material';
import { Status, statusToString } from 'enums/Status';
import { DateTime } from 'luxon';
import Image from 'next/image';
import NextLink from 'next/link';
import Router from 'next/router';
import { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/actions';
import { RootState } from 'types/RootState';
import RectangleButton from '../design/RectangleButton';
import styles from 'styles/DashboardDialog.module.scss';
import AnalyticsEvent from 'enums/AnalyticsEvent';
import FloatingDiv from '../design/FloatingDiv';

const getDialogText = (status: Status): ReactElement => {
	if (status === Status.UNVERIFIED) {
		return (
			<div className={styles.dialogText}>
				<Typography variant="body1">
					Check your email to get verified
				</Typography>
			</div>
		);
	} else if (status === Status.VERIFIED) {
		return (
			<>
				<div className={styles.dialogText}>
					<Typography variant="body1">
						You still need to complete your application!
					</Typography>
				</div>
				<div className={styles.dialogText}>
					<Typography variant="body1">
						Non-CMU students need to complete their application by
						11:59pm EST, January 24th. The deadline to be eligible
						for travel reimbursement is January 3rd.
					</Typography>
				</div>
				<div className={styles.dialogText}>
					<Typography variant="body1">
						CMU students have until January 31st.
					</Typography>
				</div>
			</>
		);
	} else if (status == Status.COMPLETED_PROFILE) {
		return (
			<>
				<div className={styles.dialogText}>
					<Typography variant="body1">
						Thank you for applying!
					</Typography>
				</div>
				<div className={styles.dialogText}>
					<Typography variant="body1">
						Once we consider your application, you will receive an
						email from <b>tartanhacks@scottylabs.org</b>
					</Typography>
				</div>
				<div className={styles.dialogText}>
					<Typography variant="body1">
						In the meantime, you can edit your application by
						clicking the button below
					</Typography>
				</div>
			</>
		);
	} else if (status === Status.ADMITTED) {
		return (
			<>
				<div className={styles.dialogText}>
					<Typography variant="body1">
						Welcome to Tartanhacks! We are excited to have you join
						us.
					</Typography>
				</div>
				<div className={styles.dialogText}>
					<Typography variant="body1">
						Please confirm your attendance within 5 days of
						receiving the acceptance email to secure your spot.
					</Typography>
				</div>
			</>
		);
	} else if (status === Status.REJECTED) {
		return (
			<>
				<div className={styles.dialogText}>
					<Typography variant="body1">
						Thanks for applying! We were unable to accommodate you
						this year. Please apply again next year!
					</Typography>
				</div>
			</>
		);
	} else if (status === Status.CONFIRMED) {
		return (
			<>
				<div className={styles.dialogText}>
					<Typography variant="body1">
						Thanks for confirming your attendance! We hope to see
						you soon!
					</Typography>
					<Typography variant="body1">
						In the meantime, join a team or create one with your
						friends!
					</Typography>
					{/**
           *
          <br />
          <Typography variant="body1">
            Once you&apos;re all set, download TartanHacks Dashboard!
          </Typography>
          <div className={styles.appStoreLinks}>
            <Link
              href="https://play.google.com/store/apps/details?id=org.scottylabs.thdapp"
              target="_blank"
            >
              <Image
                alt="Get it on Google Play"
                src="/google-play-badge.svg"
                width={563 * (40 / 168)}
                height={40}
              />
            </Link>
            <Link
              href="https://apps.apple.com/us/app/scottylabs-dashboard/id1556362423"
              target="_blank"
            >
              <Image
                alt="Download on the App Store"
                src="/ios-app-store-badge.svg"
                width={120}
                height={40}
              />
            </Link>
            <Link
              href="https://dashboard.tartanhacks.com/"
              target="_blank"
              underline="none"
            >
              <RectangleButton
                type="button"
                startIcon={<Computer />}
                backgroundColor="#000"
                className={styles.dashboardLink}
              >
                Web
              </RectangleButton>
            </Link>
          </div>
           */}
				</div>
			</>
		);
	} else if (status === Status.DECLINED) {
		return (
			<>
				<div className={styles.dialogText}>
					<Typography variant="body1">
						We&apos;re sorry you couldn&apos;t join us this year. We
						hope to see you next year!
					</Typography>
				</div>
			</>
		);
	} else {
		return <></>;
	}
};

const getButtonBox = (
	status: Status,
	resendVerification: () => Promise<void>,
	setShowDeclineDialog: (b: boolean) => void,
	isLate: boolean,
): ReactElement => {
	if (status === Status.UNVERIFIED) {
		return (
			<RectangleButton
				type="button"
				onClick={() => resendVerification()}
				className={styles.dashboardButton}
			>
				RESEND VERIFICATION EMAIL
			</RectangleButton>
		);
	} else if (status === Status.VERIFIED) {
		return isLate ? (
			<Typography
				style={{
					color: 'red',
				}}
			>
				The application deadline has passed
			</Typography>
		) : (
			<Link href="/apply" className={styles.link}>
				<RectangleButton
					type="submit"
					className={styles.dashboardButton}
				>
					COMPLETE YOUR APPLICATION
				</RectangleButton>
			</Link>
		);
	} else if (status === Status.COMPLETED_PROFILE) {
		return (
			<>
				<div className={styles.buttonBox}>
					<Link href="/apply" className={styles.link}>
						<RectangleButton
							type="submit"
							className={styles.dashboardButton}
						>
							EDIT APPLICATION
						</RectangleButton>
					</Link>
				</div>
			</>
		);
	} else if (status === Status.ADMITTED) {
		return (
			<>
				<div className={styles.buttonBox}>
					<Link href="/confirmation" className={styles.link}>
						<RectangleButton
							type="submit"
							className={styles.dashboardButton}
						>
							CONFIRM
						</RectangleButton>
					</Link>
					<div className={styles.buttonSpacer}></div>
					<RectangleButton
						type="button"
						onClick={() => {
							setShowDeclineDialog(true);
						}}
						className={styles.dashboardButton}
					>
						SORRY, I CAN&apos;T MAKE IT
					</RectangleButton>
				</div>
				<Typography
					style={{
						paddingTop: '10px',
						color: 'red',
					}}
				>
					<Alert severity="warning">
						You need to confirm in order to attend the event!
					</Alert>
				</Typography>
			</>
		);
	} else if (status === Status.CONFIRMED) {
		return (
			<div className={styles.confirmButtons}>
				<NextLink href="/teams" passHref>
					<Link underline="none">
						<RectangleButton
							type="button"
							className={styles.dashboardButton}
						>
							Browse Teams
						</RectangleButton>
					</Link>
				</NextLink>
				<br />
				<br />
				<div className={styles.buttonBox}>
					<RectangleButton
						type="button"
						onClick={() => {
							setShowDeclineDialog(true);
						}}
						className={styles.dashboardButton}
					>
						SORRY, I CAN&apos;T MAKE IT
					</RectangleButton>
				</div>
			</div>
		);
	} else {
		return <></>;
	}
};

const DashboardDialog = (): ReactElement => {
	const dispatch = useDispatch();
	const [decliningAcceptance, setDecliningAcceptance] = useState(false);
	const [sendingVerification, setSendingVerification] = useState(false);
	const [showDeclineDialog, setShowDeclineDialog] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarState, setSnackbarState] = useState<'success' | 'error'>(
		'success',
	);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const closeTime = useSelector(
		(state: RootState) => state?.settings?.closeTime,
	);
	const confirmTime = useSelector(
		(state: RootState) => state?.settings?.confirmTime,
	);

	const closeTimeDt = DateTime.fromJSDate(closeTime);
	const confirmTimeDt = DateTime.fromJSDate(confirmTime);
	const curDt = DateTime.now();

	const status =
		useSelector((state: RootState) => state?.accounts?.data?.status) ??
		null;
	const statusStr = statusToString(status);
	const email =
		useSelector((state: RootState) => state?.accounts?.data?.email) || '';

	const loading = status === null;

	const resendVerification = async () => {
		setSendingVerification(true);
		try {
			await dispatch(actions.auth.resendVerification(email));
			setSnackbarMessage('Sent verification email to: ' + email);
			setSnackbarState('success');
			setSnackbarOpen(true);
		} catch (err) {
			console.error(err);
		}
		setSendingVerification(false);
	};

	const declineAcceptance = async () => {
		setDecliningAcceptance(true);
		try {
			await dispatch(actions.user.declineAcceptance());
			window.gtag('event', AnalyticsEvent.ATTENDANCE_DECLINED);
			setSnackbarMessage('Cancelled registration');
			setSnackbarState('success');
			setSnackbarOpen(true);
		} catch (err) {
			console.error(err);
		}
		setDecliningAcceptance(false);
	};

	const dialogText = getDialogText(status);
	const isLate =
		status === Status.VERIFIED
			? curDt > closeTimeDt
			: status === Status.ADMITTED
			? curDt > confirmTimeDt
			: false;
	const buttonBox = getButtonBox(
		status,
		resendVerification,
		setShowDeclineDialog,
		isLate,
	);

	return (
		<>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={() => setSnackbarOpen(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert severity={snackbarState}>{snackbarMessage}</Alert>
			</Snackbar>
			<FloatingDiv>
				<div className={styles.dialogContent}>
					<Collapse in={loading}>
						<CircularProgress />
					</Collapse>
					{!loading && (
						<>
							<div>
								<Typography
									variant="h4"
									className={styles.statusHeaderText}
								>
									Your Status:
								</Typography>
							</div>
							<div>
								<Typography
									variant="h4"
									className={styles.statusText}
								>
									{statusStr}
								</Typography>
							</div>
							{dialogText}
							{buttonBox}
						</>
					)}
					<Collapse in={sendingVerification}>
						<br />
						<CircularProgress />
					</Collapse>
				</div>
			</FloatingDiv>
			<Dialog
				open={showDeclineDialog}
				onClose={() => {
					setShowDeclineDialog(false);
				}}
			>
				<DialogTitle className={styles.dialogHeader}>
					Cancel registration?
				</DialogTitle>
				<DialogContent className={styles.dialogContent}>
					<Collapse in={decliningAcceptance}>
						<CircularProgress />
					</Collapse>
					<DialogContentText>
						Are you sure you want to cancel your registration for
						TartanHacks 2025?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setShowDeclineDialog(false);
						}}
					>
						Cancel
					</Button>
					<Button
						onClick={async () => {
							await declineAcceptance();
							setShowDeclineDialog(false);
							Router.reload();
						}}
					>
						OK
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default DashboardDialog;
