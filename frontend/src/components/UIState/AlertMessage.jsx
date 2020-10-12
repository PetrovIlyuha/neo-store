import React from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default AlertMessage;
