import { Segment } from "@fluentui/react-northstar";
import { CalendarAgendaIcon } from "@fluentui/react-icons-northstar";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ButtonWithImage from "components/Extensions/ButtonWithImage";

export default {
  title: "Extensions/ButtonWithImage",
  component: ButtonWithImage,
} as ComponentMeta<typeof ButtonWithImage>;

const Template: ComponentStory<typeof ButtonWithImage> = (args: any) => (
  <Segment styles={{ width: "fit-content" }}>
    <ButtonWithImage {...args} />
  </Segment>
);

export const ExampleButtonWithImage = Template.bind({});

ExampleButtonWithImage.args = {
  buttonText: "Your Forms",
  icon: <CalendarAgendaIcon />,
  onClick: () => console.log("Hi!"),
};
