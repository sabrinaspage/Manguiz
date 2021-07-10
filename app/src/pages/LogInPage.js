import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import LogInForm from "../components/LogInForm/index";
import AuthProvider from "../contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

function LogInPage() {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <LogInForm />
        </div>
      </Container>
    </AuthProvider>
  );
}

export default LogInPage;
