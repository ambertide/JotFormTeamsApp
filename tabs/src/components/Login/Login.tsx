import {
  Segment,
  FormButton,
  Flex,
  Form,
  FormInput,
  Button,
  Header,
  Divider,
  Image,
  Text,
} from "@fluentui/react-northstar";
import { useCallback } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import JFLogo from "./../../assets/images/jflogo.png";

export default function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsername = useCallback((event: any) => setUsername(event.target.value || ""), []);
  const handlePassword = useCallback((event: any) => setPassword(event.target.value || ""), []);
  return (
    <Segment
      styles={{
        maxWidth: "700px",
      }}
    >
      <Flex vAlign="center">
        <Flex column>
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
        </Flex>
        <Divider
          styles={{
            height: "250px",
            marginLeft: "30px",
          }}
          vertical
        />
        <Flex column vAlign="center">
          <Image
            src={JFLogo}
            styles={{
              height: "100px",
            }}
          />
          <Text
            styles={{
              position: "absolute",
              maxWidth: "390px",
              marginTop: "180px",
            }}
            align="end"
            content="Sign in to your JotForm account to create forms and share them on the fly during your meetings."
          />
        </Flex>
      </Flex>
    </Segment>
  );
}
