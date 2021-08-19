import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MessageSegment } from "components/Extensions";

export default {
  title: "Extensions/MessageSegment",
  component: MessageSegment,
  argTypes: {
    messageType: {
      control: { type: "inline-radio" },
    },
  },
} as ComponentMeta<typeof MessageSegment>;

const Template: ComponentStory<typeof MessageSegment> = (args: any) => (
  <div style={{ height: "100%", width: "100%" }}>
    <MessageSegment {...args} />
  </div>
);

export const ExampleMessageSegment = Template.bind({});

ExampleMessageSegment.args = {
  message: "Your message went through.",
  messageType: "info",
};
