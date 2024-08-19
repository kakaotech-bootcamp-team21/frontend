import Alert from 'react-bootstrap/Alert';
import React from "react"

function AlertTmp(props) {
  const { variant } = props;

  return (
    <>
        <Alert key={variant} variant={variant}>
            {variant}
        </Alert>
    </>
  );
}

export default AlertTmp;