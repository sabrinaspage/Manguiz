// https://react-bootstrap.github.io/components/navbar/
import React from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NaviBar(props) {
    <Navbar bg="light" variant="light">
    <Navbar.Brand href="#home">Manguiz</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Leaderboard</Nav.Link>
      <Nav.Link href="#pricing">Account</Nav.Link>
    </Nav>
  </Navbar>
}

export default NaviBar;