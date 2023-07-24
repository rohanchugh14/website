import React from "react";
import { Button, Image } from "react-bootstrap";
import "../../CSS/Logos.scss";
type Props = {
  className?: string;
}
const Logos: React.FC<Props> = ({className}) => {
  return (
    <div className={className}>
      <Button
        as="a"
        href="mailto:rohanchugh14@gmail.com"
        variant="link"
      >
        <Image
          src="/img/email-logo.svg"
        />
      </Button>
      <Button
        as="a"
        href="https://www.github.com/rohanchugh14"
        target="_blank"
        variant="link"
        rel="noopener noreferrer"
      >
        <Image
          src="/img/github-logo.svg"
        />
      </Button>
      <Button
        as="a"
        href="https://www.linkedin.com/in/rohanchugh"
        target="_blank"
        variant="link"
        rel="noopener noreferrer"
      >
        <Image
          src="/img/linkedin-logo.svg"
        />
      </Button>
    </div>
  );
};

export default Logos;
