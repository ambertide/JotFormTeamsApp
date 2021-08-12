import { SelfValidatingInput } from "components/Extensions";
import { Segment } from "@fluentui/react-northstar";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Extensions/SelfValidatingInput",
  component: SelfValidatingInput,
} as ComponentMeta<typeof SelfValidatingInput>;

const Template: ComponentStory<typeof SelfValidatingInput> = (args: any) => (
  <Segment styles={{ width: "fit-content" }}>
    <SelfValidatingInput {...args} />
  </Segment>
);

export const ExampleSelfValidatingInput = Template.bind({});

ExampleSelfValidatingInput.args = {
  label: "What is your name?",
  required: true,
};
