import { ComponentStory, ComponentMeta } from "@storybook/react";
import ChoiceAdder from "components/QuestionFragments/ChoiceAdder";
import { Segment } from "@fluentui/react-northstar";
import I from "immutable";

export default {
  title: "ChoiceAdder",
  component: ChoiceAdder,
} as ComponentMeta<typeof ChoiceAdder>;

const Template: ComponentStory<typeof ChoiceAdder> = (args: any) => <ChoiceAdder {...args} />;

export const TabChoiceAdder = Template.bind({});

TabChoiceAdder.args = {
  initialChoices: I.List([
    "Choice",
    "Choice",
    "Choice",
    "Choice",
    "Choice",
    "Choice",
    "Choice",
    "Choice",
  ]),
  setQuestionProperty: () => {
    console.log("Added.");
  },
};
