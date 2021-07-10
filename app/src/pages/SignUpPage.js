import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card } from 'react-bootstrap';
import { useRef } from "react";

function SignUpPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();


  return (
    <>
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4"> Sign Up</h2>
        <Form>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
          </Form.Group>
          <Form.Group id="password-confirm">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" ref={passwordConfirmRef} required />
          </Form.Group>
          <Button className="w-100" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
    </>
  );
}

export default SignUpPage;
