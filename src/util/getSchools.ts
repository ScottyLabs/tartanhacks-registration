import axios from 'axios';

import { parseAsync } from './parseAsync';

export const getSchools = async (): Promise<string[]> => {
	const response = await axios.get('/schools.csv');
	const schoolMatrix: string[] = await parseAsync(response.data);
	const schools = schoolMatrix.flat();
	return schools;
};
