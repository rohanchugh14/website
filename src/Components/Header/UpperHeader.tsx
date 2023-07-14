import React from "react";
import Logos from "./Logos";
import CustomNavbar from "./CustomNavbar";
import { Row, Col, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import "../../CSS/UpperHeader.scss";

const UpperHeader = () => {
  return (
    <div className="upper-header">
      <Logos />
      <Image src="/img/rohan-chugh-logo.svg" />
      <Image src="/img/rc-logo.svg" />
    </div>
  );
};

export default UpperHeader;
