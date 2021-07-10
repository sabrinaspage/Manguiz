import React from "react";
import { Container } from "react-bootstrap";

export const CharacterGrid = ({ children }) => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minWidth: "100%", minHeight: "80vh" }}
    >
      <div class="row">{children}</div>
    </Container>
  );
};
