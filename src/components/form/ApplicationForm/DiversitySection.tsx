import {
	TextField,
	Typography
} from '@mui/material';
import React, {
	Dispatch,
	ReactElement,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/actions';
import { DiversityFields } from 'types/ApplicationForm';
import { RootState } from 'types/RootState';
import styles from './index.module.scss';

const DiversitySection = ({
	validate,
	setValidate,
	setValid,
}: {
	validate: boolean;
	setValidate: Dispatch<SetStateAction<boolean>>;
	setValid: Dispatch<SetStateAction<boolean>>;
}): ReactElement => {
	const dispatch = useDispatch();

	const fetchedProfile = useSelector(
		(state: RootState) => state?.application?.fetchedProfile,
	);
	const diversityStatementStore =
		useSelector((state: RootState) => state?.application?.diversity?.diversityStatement) ??
		null;

	const [diversityStatement, setDiversityStatement] = useState<string>('');

	const validateForm = async () => {
		const data: DiversityFields = { diversityStatement };
		await dispatch(actions.application.saveDiversity(data));
		setValid(true);
		setValidate(false);
	};

	useEffect(() => {
		if (validate) {
			validateForm();
		}
		// eslint-disable-next-line
	}, [validate]);

	useEffect(() => {
		if (fetchedProfile && diversityStatementStore) {
			setDiversityStatement(diversityStatementStore);
		}
		// eslint-disable-next-line
	}, [fetchedProfile]);

	const maxChars = 5000;

	return (
		<div className={styles.section}>
			<Typography variant="h5" className={styles.sectionHeader}>
				Diversity Statement
			</Typography>
			<Typography variant="body1">
				At TartanHacks, we believe that diverse
				perspectives, backgrounds, and experiences are
				crucial to building an environment where everyone is
				empowered to bring their moonshot ideas to life. If
				you have a unique background that you&apos;d like to
				share with us, please do so here! We will prioritize
				bringing you to TartanHacks.
			</Typography>
			<TextField
				label="Diversity Statement"
				variant="outlined"
				fullWidth
				multiline
				value={diversityStatement}
				onChange={(e) => {
					setDiversityStatement(e.target.value.slice(0, maxChars));
				}}
				placeholder={
					'Please write here...\n\n'
				}
			/>
	</div>
	);
};

export default DiversitySection;
