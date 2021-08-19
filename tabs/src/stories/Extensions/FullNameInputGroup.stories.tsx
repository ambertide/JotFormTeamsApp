import { Segment } from "@fluentui/react-northstar";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import FullNameInputGroup from "components/Extensions/FullNameInputGroup";

export default {
  title: "Extensions/FullNameInputGroup",
  component: FullNameInputGroup,
  argTypes: {
    prefixList: {
      control: { type: "boolean" }, // Automatically inferred when 'options' is defined
    },
  },
} as ComponentMeta<typeof FullNameInputGroup>;

const Template: ComponentStory<typeof FullNameInputGroup> = ({ prefixList, ...args }) => (
  <Segment styles={{ width: "fit-content" }}>
    <FullNameInputGroup
      prefixList={prefixList ? ["QC", "KC", "Dr", "Prof."] : undefined}
      {...args}
    />
  </Segment>
);

export const ExampleFullNameInputGroup = Template.bind({});

ExampleFullNameInputGroup.args = {};
