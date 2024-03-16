import {
	AccessibilityNew,
	Cancel,
	CheckCircle,
	Computer,
	Person,
	Restaurant,
} from '@mui/icons-material';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { ReactElement } from 'react';
import { AnalyticsData } from 'src/_types/AnalyticsData';
import styles from './index.module.scss';

interface DietaryRestriction {
	name: string;
	count: number;
}

function DietaryRestrictionsTable({
	dietaryRestrictions,
}: {
	dietaryRestrictions: DietaryRestriction[];
}): JSX.Element {
	return (
		<TableContainer component={Paper}>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Dietary Restriction</TableCell>
						<TableCell>Number</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{dietaryRestrictions.map((restriction) => (
						<TableRow key={restriction.name}>
							<TableCell>{restriction.name}</TableCell>
							<TableCell>{restriction.count}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

const parseShirtSizes = (data: AnalyticsData | undefined): string => {
	if (data === undefined) {
		return '';
	}
	return Array.from(Object.keys(data.shirtSizes))
		.map((size) => size + ' (' + data.shirtSizes[size] + ')')
		.join(', ');
};

const cleanDietaryRestrictions = (
	data: AnalyticsData | undefined,
): DietaryRestriction[] => {
	if (data === undefined) {
		return [];
	}

	// Remove none and n/a
	// Filter out noise words
	const invalidKeys = ['none', 'na', 'no', 'nil', ''];
	const entries = Object.entries(data.dietaryRestrictions).map(
		([name, count]) => {
			const lower = name.toLocaleLowerCase();
			return [lower.trim(), count];
		},
	) as [string, number][];
	const filtered = entries.filter(
		([key]) => !invalidKeys.includes(key.toLowerCase().trim()),
	);

	// Merge duplicates
	const merged = {} as Record<string, number>;
	for (const [name, count] of filtered) {
		if (merged[name] == null) {
			merged[name] = 0;
		}
		merged[name] += count;
	}

	const restrictions = Object.entries(merged).map(([name, count]) => ({
		name,
		count,
	}));
	const sorted = restrictions.sort((a, b) =>
		a.count === b.count ? a.name.localeCompare(b.name) : b.count - a.count,
	);

	return sorted;
};

const Stats = ({
	data,
}: {
	data?: AnalyticsData | undefined;
}): ReactElement => {
	if (data === undefined) {
		return <></>;
	}

	return (
		<div className={styles.section}>
			<Typography variant="h4">STATS</Typography>
			<div className={styles.subsection}>
				<Typography className={styles.entry}>
					<CheckCircle className={styles.icon} htmlColor="green" />
					Total Users: {data.total}
				</Typography>
				<Typography className={styles.entry}>
					<CheckCircle className={styles.icon} htmlColor="green" />
					Verified Users: {data.verified} (
					{Math.round((data.verified / data.total) * 100)}%)
				</Typography>
				<Typography className={styles.entry}>
					<CheckCircle className={styles.icon} htmlColor="green" />
					Submitted Users: {data.submitted} (
					{Math.round((data.submitted / data.total) * 100)}%)
				</Typography>
			</div>
			<div className={styles.subsection}>
				<Typography className={styles.entry}>
					<CheckCircle className={styles.icon} htmlColor="green" />
					Admitted: {data.admitted}
				</Typography>
				<Typography className={styles.entry}>
					<CheckCircle className={styles.icon} htmlColor="green" />
					Confirmed (Total): {data.confirmed}
				</Typography>
				<Typography className={styles.entry}>
					<CheckCircle className={styles.icon} htmlColor="green" />
					Confirmed (CMU): {data.confirmedCmu}
				</Typography>
				<Typography className={styles.entry}>
					<Cancel className={styles.icon} htmlColor="red" />
					Declined: {data.declined}
				</Typography>
			</div>
			<div className={styles.subsection}>
				<Typography className={styles.entry}>
					<AccessibilityNew className={styles.icon} />
					Shirt sizes: {parseShirtSizes(data)}
				</Typography>
				<Typography className={styles.entry}>
					<Computer className={styles.icon} />
					Need Hardware: {data.wantsHardware}
				</Typography>
			</div>
			<div className={styles.subsection}>
				<Typography className={styles.entry}>
					<Restaurant className={styles.icon} />
					Dietary Restrictions:
					<DietaryRestrictionsTable
						dietaryRestrictions={cleanDietaryRestrictions(data)}
					/>
				</Typography>
			</div>
			<div className={styles.subsection}>
				<Typography className={styles.entry}>
					<Person className={styles.icon} />
					Attending Physically: {data.attendance.physical} (
					{Math.round(
						(data.attendance.physical / data.submitted) * 100,
					)}
					%)
				</Typography>
				<Typography className={styles.entry}>
					<Computer className={styles.icon} />
					Attending Virtually: {data.attendance.virtual} (
					{Math.round(
						(data.attendance.virtual / data.submitted) * 100,
					)}
					%)
				</Typography>
			</div>
		</div>
	);
};

export default Stats;
