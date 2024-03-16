import { IconButton, Tooltip } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import { ArrowBack } from '@mui/icons-material';
import RectangleButton from './RectangleButton';
import NextLink from 'next/link';
import Link from '@mui/material/Link';

const BackButton = (props: any) => {
	const link = props.link;
	return (
		<Tooltip title="Back">
			<NextLink href={link} passHref>
				<Link underline="none">
					<RectangleButton type="button" className={props.className}>
						<>
							<ArrowBack />
							&nbsp;BACK
						</>
					</RectangleButton>
				</Link>
			</NextLink>
		</Tooltip>
	);
};

export default BackButton;
