import CheckboxGroup from "components/Extensions/CheckboxGroup";
import { Segment } from "@fluentui/react-northstar";
import I from "immutable";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Extensions/CheckboxGroup",
  component: CheckboxGroup,
} as ComponentMeta<typeof CheckboxGroup>;

const Template: ComponentStory<typeof CheckboxGroup> = (args: any) => (
  <Segment styles={{ width: "fit-content" }}>
    <CheckboxGroup {...args} />
  </Segment>
);

export const ExampleCheckboxGroup = Template.bind({});

ExampleCheckboxGroup.args = {
  items: I.List([
    {
      keyID: "item1",
      text: "First.",
    },
    {
      keyID: "item2",
      text: "Second.",
    },
    {
      keyID: "item3",
      text: "First.",
    },
  ]),
  allowOther: false,
  otherText: "Other",
};
