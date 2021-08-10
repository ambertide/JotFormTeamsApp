import { ComponentStory, ComponentMeta } from "@storybook/react";
import I from "immutable";
import Poll from "components/TaskModule/Poll";

export default {
  title: "TaskModule/Poll",
  component: Poll,
  argTypes: {
    questions: {
      control: { disable: true },
    },
  },
} as ComponentMeta<typeof Poll>;

const Template: ComponentStory<typeof Poll> = (args: any) => <Poll {...args} />;

export const TabFormsList = Template.bind({});

TabFormsList.args = {
  questions: I.List([
    {
      name: "whatIs",
      order: "1",
      qid: "1",
      required: "Yes" as const,
      text: "What is your name?",
      type: "control_fullname",
    },
    {
      maxsize: "60",
      name: "whatIs2",
      order: "2",
      qid: "2",
      required: "Yes" as const,
      text: "What is your email?",
      type: "control_textbox",
      validation: "Email",
    },
    {
      allowOther: "No" as const,
      name: "whatIs3",
      options: "Primary|Secondary|University",
      order: "3",
      qid: "3",
      required: "Yes" as const,
      special: "None",
      text: "What is your education?",
      type: "control_radio",
    },
    {
      allowOther: "Yes" as const,
      name: "whatIs4",
      options: "Vegaterian|Vegan",
      order: "4",
      otherText: "Other",
      qid: "4",
      required: "Yes" as const,
      special: "None",
      text: "What is your dietary choices?",
      type: "control_checkbox",
    },
  ]),
};
