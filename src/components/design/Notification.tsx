import { Snackbar, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export default function Notification(props: any) {

    const { notify, setNotify } = props;

    const handleClose = (
        event: React.SyntheticEvent | React.MouseEvent,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false,
        })
    }

    return (
        <div>

            <Snackbar
                open={notify.isOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert
                    severity={notify.type}
                    onClose={handleClose}
                    variant="filled">
                    {notify.message}
                </Alert>
            </Snackbar>
        </div>
    )
}