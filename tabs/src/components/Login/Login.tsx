import {
  Segment,
  FormButton,
  Flex,
  Form,
  FormInput,
  Button,
  Header,
} from "@fluentui/react-northstar";
import { useCallback } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsername = useCallback((event: any) => setUsername(event.target.value || ""), []);
  const handlePassword = useCallback((event: any) => setPassword(event.target.value || ""), []);
  return (
    <Flex column hAlign="center">
      <Segment>
        <Header content="Sign In" />
        <Form
          onSubmit={() => {
            dispatch({ type: "AUTH_REQUEST", username: username, password: password });
          }}
        >
          <FormInput
            onChange={handleUsername}
            label="JotForm Username"
            name="username"
            id="username"
            required
            showSuccessIndicator={false}
          />
          <FormInput
            onChange={handlePassword}
            label="Password"
            name="password"
            id="password"
            type="password"
            required
            showSuccessIndicator={false}
          />
          <Flex gap="gap.small" hAlign="end">
            <FormButton content="Sign In" primary />
            <Button content="Sign Up" />
          </Flex>
        </Form>
      </Segment>
    </Flex>
  );
}
