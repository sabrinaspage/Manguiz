import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import SignUpForm from "../components/SignUpForm";
import AuthProvider from "../contexts/AuthContext"

function SignUpPage() {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <SignUpForm />
        </div>
      </Container>
    </AuthProvider>
  );
}

export default SignUpPage;
