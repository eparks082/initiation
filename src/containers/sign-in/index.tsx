import React, { useState, ChangeEvent } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Spinner,
} from "reactstrap";
import axios from "axios";
import "./index.scss";

const LoadingSpinner = () => {
  return <Spinner color="primary" size="sm" />;
};

interface SignInState {
  username: string;
  password: string;
}

interface SignInProps {
  setToken: Function;
}

const SignIn = (props: SignInProps) => {
  const [credentials, setCredentials] = useState<SignInState>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const onFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    axios({
      method: "post",
      url: "https://api.intelliscan.io/user/sign-in/",
      data: credentials,
    })
      .then((res) => {
        const {
          data: { token },
        } = res;
        props.setToken(token);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const { username, password } = credentials;
  return (
    <>
      <div className="pg-title">Log in Page</div>
      <Form onSubmit={onFormSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="with a placeholder"
            value={username}
            disabled={loading}
            onChange={onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="password placeholder"
            value={password}
            disabled={loading}
            onChange={onInputChange}
          />
        </FormGroup>
        {error && (
          <Alert color="danger" style={{ opacity: 1 }}>
            {error}
          </Alert>
        )}
        <Button disabled={loading} style={{ minWidth: 100 }}>
          {loading ? <LoadingSpinner /> : "Submit"}
        </Button>
      </Form>
    </>
  );
};

export default SignIn;
