import { SelfValidatingInput } from "components/Extensions";
import { Segment } from "@fluentui/react-northstar";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Extensions/SelfValidatingInput",
  component: SelfValidatingInput,
  argTypes: {
    required: {
      control: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof SelfValidatingInput>;

const Template: ComponentStory<typeof SelfValidatingInput> = (args: any) => (
  <Segment styles={{ width: "fit-content" }}>
    <SelfValidatingInput {...args} />
  </Segment>
);

export const RequiredSelfValidatingInput = Template.bind({});
export const OptionalSelfValidatingInput = Template.bind({});

RequiredSelfValidatingInput.args = {
  label: "What is your name?",
  required: true,
};

OptionalSelfValidatingInput.args = {
  label: "What is your name?",
  required: false,
};
