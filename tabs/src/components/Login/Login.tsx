import { FormButton, Flex, Form, FormInput, Button, Header } from "@fluentui/react-northstar";

export default function Login() {
  return (
    <Flex column>
      <Header content="Sign In" description="Sign in to your JotForm Account" />
      <Form
        onSubmit={() => {
          alert("Form submitted");
        }}
      >
        <FormInput
          label="JotForm Username"
          name="username"
          id="username"
          required
          showSuccessIndicator={false}
        />
        <FormInput
          label="Password"
          name="password"
          id="password"
          required
          showSuccessIndicator={false}
        />
        <Flex>
          <FormButton content="Sign In" primary />
          <Button content="Sign Up" />
        </Flex>
      </Form>
    </Flex>
  );
}
