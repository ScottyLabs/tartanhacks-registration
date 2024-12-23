import parse from 'csv-parse';

export const parseAsync = (inputStr: string): Promise<string[]> => {
	return new Promise((resolve, reject) => {
		parse(
			inputStr,
			{},
			(err: Error | undefined, records: any | undefined): void => {
				if (err) {
					reject(err);
					return;
				}
				resolve(records);
			},
		);
	});
};