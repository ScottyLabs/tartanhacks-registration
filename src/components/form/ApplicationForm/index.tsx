import {
	Button,
	CircularProgress,
	Collapse,
	Paper,
	Snackbar,
	Typography,
} from '@mui/material';
import { Alert } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/actions';
import RectangleButton from 'src/components/design/RectangleButton';
import { RootState } from 'types/RootState';
import BasicSection from './BasicSection';
import TravelSection from './TravelSection';
import ExperienceSection from './ExperienceSection';
import LogisticsSection from './LogisticsSection';
import PortfolioSection from './PortfolioSection';
import SchoolSection from './SchoolSection';
import WorkAuthorizationSection from './WorkAuthorizationSection';
import styles from './index.module.scss';
import AnalyticsEvent from 'enums/AnalyticsEvent';
import DiversitySection from './DiversitySection';
import ConsentSection from './ConsentSection';

const ApplicationForm = (): ReactElement => {
	const dispatch = useDispatch();
	const router = useRouter();
	const application = useSelector((state: RootState) => state?.application);
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState(application?.error);

	const [validateBasic, setValidateBasic] = useState(false);
	const [validateDiversity, setValidateDiversity] = useState(false);
	const [validateTravel, setValidateTravel] = useState(false);
	const [validateExperience, setValidateExperience] = useState(false);
	const [validateLogistics, setValidateLogistics] = useState(false);
	const [validatePortfolio, setValidatePortfolio] = useState(false);
	const [validateSchool, setValidateSchool] = useState(false);
	const [validateWorkAuth, setValidateWorkAuth] = useState(false);
	const [validateConsent, setValidateConsent] = useState(false);

	const [validBasic, setValidBasic] = useState(false);
	const [validDiversity, setValidDiversity] = useState(false);
	const [validTravel, setValidTravel] = useState(false);
	const [validExperience, setValidExperience] = useState(false);
	const [validLogistics, setValidLogistics] = useState(false);
	const [validPortfolio, setValidPortfolio] = useState(false);
	const [validSchool, setValidSchool] = useState(false);
	const [validWorkAuth, setValidWorkAuth] = useState(false);
	const [validConsent, setValidConsent] = useState(false);

	const [calledValidate, setCalledValidate] = useState(false);

	const [isCMUStudent, setIsCMUStudent] = useState(false);

	// Check that all validate requests are false (i.e. completed)
	const validated = ![
		validateBasic,
		validateDiversity,
		validateTravel,
		validateExperience,
		validateLogistics,
		validatePortfolio,
		validateSchool,
		validateWorkAuth,
		validateConsent,
	].some(Boolean);

	// Check that all sections are valid
	const valid = [
		validBasic,
		validDiversity,
		validTravel,
		validExperience,
		validLogistics,
		validPortfolio,
		validSchool,
		validWorkAuth,
		validConsent,
	].every(Boolean);

	const validateForm = async () => {
		// Trigger section validation
		setValidateBasic(true);
		setValidateDiversity(true);
		setValidateTravel(true);
		setValidateExperience(true);
		setValidateLogistics(true);
		setValidatePortfolio(true);
		setValidateSchool(true);
		setValidateWorkAuth(true);
		setValidateConsent(true);

		setCalledValidate(true);
	};

	const submitForm = async () => {
		const {
			basic,
			diversity,
			travel,
			experience,
			logistics,
			portfolio,
			school,
			workAuth,
			consent,
		} = application;
		const data = {
			...basic,
			...diversity,
			...travel,
			...experience,
			...logistics,
			...portfolio,
			...school,
			...workAuth,
			...consent,
		};
		setLoading(true);
		console.log('data', data);
		console.log('application', application);
		try {
			await dispatch(actions.application.submitForm(data));
			window.gtag('event', AnalyticsEvent.APPLICATION_SUBMITTED);
		} catch (err: any) {
			setError(true);
			setErrorMessage(err.data);
		}
		setLoading(false);
		router.push('/');
	};

	useEffect(() => {
		if (calledValidate && validated) {
			if (valid) {
				submitForm();
			} else {
				setError(true);
				setErrorMessage(
					'Some fields are incorrect. Please review to make sure you filled all required fields.',
				);
			}
		}
	}, [valid, calledValidate, validated]);

	useEffect(() => {
		const loadProfile = async () => {
			try {
				await dispatch(actions.application.getProfile());
			} catch (err) {
				// No submitted profile yet
			}
		};
		loadProfile();
	}, []);

	return (
		<div className={styles.formDialog}>
			<Snackbar
				open={error}
				autoHideDuration={5000}
				onClose={(e) => setError(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert severity="error">{errorMessage}</Alert>
			</Snackbar>
			<form
				className={styles.applicationForm}
				onSubmit={(e) => {
					e.preventDefault();
					validateForm();
				}}
			>
				<div className={styles.headerContainer}>
					<Typography variant="h4" className={styles.header}>
						Application
					</Typography>
				</div>
				<div className={styles.formContents}>
					<BasicSection
						validate={validateBasic}
						setValidate={setValidateBasic}
						setValid={setValidBasic}
					/>
					<SchoolSection
						validate={validateSchool}
						setValidate={setValidateSchool}
						setValid={setValidSchool}
						setIsCMUStudent={setIsCMUStudent}
					/>
					<ExperienceSection
						validate={validateExperience}
						setValidate={setValidateExperience}
						setValid={setValidExperience}
					/>
					<WorkAuthorizationSection
						validate={validateWorkAuth}
						setValidate={setValidateWorkAuth}
						setValid={setValidWorkAuth}
					/>
					<PortfolioSection
						setError={setError}
						setErrorMessage={setErrorMessage}
						validate={validatePortfolio}
						setValidate={setValidatePortfolio}
						setValid={setValidPortfolio}
					/>
					<TravelSection
						validate={validateTravel}
						setValidate={setValidateTravel}
						setValid={setValidTravel}
					/>
					<DiversitySection
						validate={validateDiversity}
						setValidate={setValidateDiversity}
						setValid={setValidDiversity}
					/>
					<LogisticsSection
						validate={validateLogistics}
						setValidate={setValidateLogistics}
						setValid={setValidLogistics}
						isCMUStudent={isCMUStudent}
					/>
					<ConsentSection
						validate={validateConsent}
						setValidate={setValidateConsent}
						setValid={setValidConsent}
					/>
					<div className={styles.buttonContainer}>
						<RectangleButton type="submit">
							{application?.fetchedProfile
								? 'Save Application'
								: 'Submit Application'}
						</RectangleButton>
						<Collapse in={loading}>
							<CircularProgress />
						</Collapse>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ApplicationForm;
