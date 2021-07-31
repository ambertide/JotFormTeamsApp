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
import JFLogo from "assets/images/jflogo.png";
interface LoginProps {
  /**
   * Callback function that stores the passed credentials in a global state.
   */
  onSubmit: (username: string, password: string) => void;
  /**
   * When true, only the login fields are shown.
   */
  isLite?: boolean;
}

/**
 * Used to Log in the user to their JotForm account.
 */
export default function Login(props: LoginProps) {
  const { onSubmit, isLite } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsername = useCallback((event: any) => setUsername(event.target.value || ""), []);
  const handlePassword = useCallback((event: any) => setPassword(event.target.value || ""), []);
  return (
    <Segment
      styles={{
        maxWidth: "fit-content",
        overflowX: "hidden",
      }}
    >
      <Flex vAlign="center">
        <Flex column>
          <Header content="Sign In" />
          <Form onSubmit={(event) => onSubmit(username, password)}>
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
        {!isLite ? (
          <Divider
            styles={{
              height: "250px",
              marginLeft: "30px",
            }}
            vertical
          />
        ) : null}
        {!isLite ? (
          <Flex column vAlign="center">
            <Image
              src={JFLogo}
              styles={{
                height: "100px",
                width: "400px",
              }}
            />
            <Text
              style={{
                maxWidth: "400px",
              }}
              align="end"
              content="Sign in to your JotForm account to create forms and share them on the fly during your meetings."
            />
          </Flex>
        ) : null}
      </Flex>
    </Segment>
  );
}
