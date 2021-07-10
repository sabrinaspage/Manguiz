import { Button } from "bootstrap";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router";

const LogOut = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.pushState("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Button variant="link" onClick={handleLogout}>
        Log Out
      </Button>
      {error && <span style={{color: "red"}}> {error} </span>}
    </>
  );
};

export default LogOut;
