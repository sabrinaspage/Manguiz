import { Button } from "bootstrap";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const LogOut = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.pushState("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return <Button variant="link" onClick={handleLogout}>Log Out</Button>;
};

export default LogOut;
