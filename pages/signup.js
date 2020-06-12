import React, { useState, useEffect } from "react";
import { Button, Form, Icon, Message, Segment } from "semantic-ui-react";
import axios from "axios";
import Link from "next/link";
import catchErrors from "../utils/catchErrors";
import baseUrl from "../utils/baseUrl";
import { handleLogin } from "../utils/auth";

const initialUser = {
  name: "",
  email: "",
  password: ""
};

function Signup() {
  const [user, setUser] = useState(initialUser);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));

    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  }

  const { name, email, password } = user;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const url = `https://cors-anywhere.herokuapp.com/${baseUrl}/api/signup`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      handleLogin(response.data);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Message
        attached
        icon="setting"
        header="Getting Started!"
        content="Create a new account"
        color="teal"
      />
      <Form loading={loading} error={Boolean(error)} onSubmit={handleSubmit}>
        <Message error header="Oops!" content={error} />
        <Segment>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            label="Name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
          />

          <Form.Input
            fluid
            icon="envelope"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
          />

          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />

          <Button
            icon="signup"
            type="submit"
            color="orange"
            content="Signup"
            disabled={disabled || loading}
          />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        Existing user?{" "}
        <Link href="/login">
          <a>Log in here</a>
        </Link>{" "}
        instead.
      </Message>
    </>
  );
}

export default Signup;
