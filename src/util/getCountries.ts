import axios from 'axios';

import { parseAsync } from './parseAsync';

export const getCountries = async (): Promise<string[]> => {
	const response = await axios.get('/countries.csv');
	const countryMatrix: string[] = await parseAsync(response.data);
	const countries = countryMatrix.flat();
	return countries;
};
