// https://react-bootstrap.github.io/components/navbar/
import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";

import "../styles/navibar.css";

/*
Necessary prop:
loggedIn: boolean




avatar: link to avatar image (if not logged in, unnecessary)
*/
function NaviBar(props) {
  const kanaTop = "マンガ";
  const kanaBottom = "クイズ";

  const avatar = props.avatar;
  const loggedIn = props.loggedIn;

  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="/dashboard">
        <div className="branding">
          <div className="kana">
            {kanaTop}
            <br />
            {kanaBottom}
          </div>
          <br />
          <span className="eng">Manguiz</span>
        </div>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/game">Play</Nav.Link>
        <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
        <Nav.Link href="/rewards">Rewards</Nav.Link>
      </Nav>
      <AccountSection loggedIn={loggedIn} />
    </Navbar>
  );
}

function AccountSection(props) {
  if (props.loggedIn) {
    return (
      <>
        <Nav>
          <Nav.Link href="/logout">Log Out</Nav.Link>
        </Nav>

        <Navbar.Brand href="/account">
          <Image
            src={props.avatar ? props.avatar : "https://via.placeholder.com/64"}
            roundedCircle
          />
        </Navbar.Brand>
      </>
    );
  } else {
    return (
      <>
        <Nav>
          <Nav.Link href="/">Sign Up</Nav.Link>
        </Nav>
      </>
    );
  }
}

export default NaviBar;
