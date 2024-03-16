import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { deleteCookie } from 'cookies-next';

const Home: NextPage = (): ReactElement => {
	const router = useRouter();

	useEffect(() => {
		window.localStorage.removeItem('accessToken');
		deleteCookie('accessToken');

		router.push('/login');
	}, []);

	return <></>;
};

export default Home;
