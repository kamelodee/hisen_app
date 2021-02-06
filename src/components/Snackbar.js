import React, { Fragment } from "react";
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';

const UseSnackbar = ({ open, handleClose, severity = "info", message }) => {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  return (
    <Fragment>
      <Snackbar style={{ width: "60%" }} open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert severity={severity} >
          {message}
      </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default UseSnackbar;
