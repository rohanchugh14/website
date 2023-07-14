import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import "../styles/CustomNavbar.scss";
const CustomNavbar = () => {
  return (
    <Navbar expand="lg" sticky="top">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-row custom-nav">
          <Nav.Link href="/#projects">
            <span>Projects</span>
          </Nav.Link>
          <Nav.Link href="/#experience">
            <span>Design Experience</span>
          </Nav.Link>
          <Nav.Link href="/#clubs">
            <span>Clubs/Orgs</span>
          </Nav.Link>
          <Nav.Link href="/#coursework">
            <span>Coursework</span>
          </Nav.Link>
          <Nav.Link href="/#skills">
            <span>Skills</span>
          </Nav.Link>
          <Nav.Link href="/#work">
            <span>Work Experience</span>
          </Nav.Link>
          <Nav.Link href="/#education">
            <span>Education</span>
          </Nav.Link>
          <Nav.Link href="/#contact">
            <span>Contact</span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
