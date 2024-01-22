import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ShowSnackbar(props) {
  // const [open, setOpen] = React.useState(false);
  return (
      <Snackbar anchorOrigin={{ vertical : 'top', horizontal : 'right' }} open={props.open}>
        <Alert severity={props.type}  variant="filled" sx={{ width: '100%', color: 'white', fontSize: "15px"}}>
          {props.content}
        </Alert>
      </Snackbar>
  );
}