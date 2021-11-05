import * as React from 'react';
import { Alert } from '@material-ui/lab';
import { AlertTitle } from '@material-ui/lab';
import { Button } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
import Notification from 'src/components/design/Notification';

export default function SimpleSnackbar() {
  const [open, setOpen] = React.useState({ 
    isOpen: false, 
    message: '', 
    type: '' 
  });

  const handleClick = () => {
    setOpen({ 
      isOpen: true, 
      message: 'Error!', 
      type: 'error' 
    });
  };

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string,
  ) => {
    console.log('closing')
    if (reason === 'clickaway') {
      return;
    }

    setOpen({ 
      isOpen: false, 
      message: '', 
      type: '' 
    });
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
      </IconButton>
    </React.Fragment>
  );
  console.log(open);
  return (
    <div>
      <Button onClick={handleClick}>Open simple snackbar</Button>
        
      <Notification
        notify={open}
        setNotify={setOpen}
      />
    </div>
  );
}