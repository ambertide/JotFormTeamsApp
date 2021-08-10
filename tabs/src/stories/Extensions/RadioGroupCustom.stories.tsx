import RadioGroupCustom from "components/Extensions/RadioGroupCustom";
import { Segment } from "@fluentui/react-northstar";
import I from "immutable";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Extensions/RadioGroupCustom",
  component: RadioGroupCustom,
} as ComponentMeta<typeof RadioGroupCustom>;

const Template: ComponentStory<typeof RadioGroupCustom> = (args: any) => (
  <Segment styles={{ width: "fit-content" }}>
    <RadioGroupCustom {...args} />
  </Segment>
);

export const ExampleRadioGroup = Template.bind({});

ExampleRadioGroup.args = {
  options: ["First", "Second", "First"],
  allowOther: false,
  otherText: "Other",
};
