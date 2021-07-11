import React from "react";
import Button from "react-bootstrap/Button";

function UserSection(props) {
  const userimage = props.image;
  return (
    <div className="user-section">
      <div className="account-buttons">
        <Button variant="outline-dark" size="lg">
          Log Out
        </Button>
        <Button variant="outline-dark" size="lg">
          Change Email
        </Button>
        <Button variant="outline-dark" size="lg">
          Reset Password
        </Button>
      </div>
      {props.children}
    </div>
  );
}

export default UserSection;
