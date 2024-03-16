import { NextPage } from 'next';
import { ReactElement } from 'react';
import PasswordResetDialog from 'src/components/auth/RequestResetDialog';
import WaveHeader from 'src/components/design/WaveHeader';
import styles from '../styles/Auth.module.scss';

const ForgotPasswordPage: NextPage = (): ReactElement => {
	return (
		<div>
			<WaveHeader variant="dark" />
			<div className={styles.dialog}>
				<PasswordResetDialog />
			</div>
		</div>
	);
};

export default ForgotPasswordPage;
