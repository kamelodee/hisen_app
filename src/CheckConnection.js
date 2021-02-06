import React, { Fragment, useState } from "react";
import { SWRConfig } from "swr";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
const CheckConnection = ({ children }) => {
  const [slowInterNet, setSlowInterNet] = useState(false);
  return (
    <Fragment>
      <SWRConfig
        value={{
          onLoadingSlow: () => {
            setSlowInterNet(true);
          },
          onSuccess: () => {
            if (setSlowInterNet) {
              setSlowInterNet(false);
            }
          },
        }}
      >
        {children}
      </SWRConfig>
      <Snackbar open={slowInterNet}>
        <Alert variant="filled" severity="info">
          Slow Internet Connection
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default CheckConnection;
