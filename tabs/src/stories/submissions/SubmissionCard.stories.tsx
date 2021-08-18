import { ComponentStory, ComponentMeta } from "@storybook/react";
import I from "immutable";
import SubmissionCard from "components/submissions/SubmissionViews/CardView/SubmissionCard";
import { Segment } from "@fluentui/react-northstar";

export default {
  title: "Submissions/SubmissionCard",
  component: SubmissionCard,
  argTypes: {
    answers: {
      control: { disable: true },
    },
  },
} as ComponentMeta<typeof SubmissionCard>;

const Template: ComponentStory<typeof SubmissionCard> = (args: any) => (
  <Segment>
    <SubmissionCard {...args} />
  </Segment>
);

export const ExampleSubmissionCard = Template.bind({});

ExampleSubmissionCard.args = {
  formTitle: "Example Form",
  formQuestions: I.Map({
    "1": "What is your email?",
    "2": "What is your age?",
    "3": "What is your full name?",
    "4": "What is your education level?",
    "5": "Additional dietary preferences?",
    "6": "Select Monday",
    "7": "Select multiple days.",
  }),
  submission: {
    submissionID: "1",
    ipAdress: "127.0.0.1",
    submissionDate: "2021-08-10 14:29:00",
    answers: I.List([
      {
        qid: "1",
        answer: { text: "test@example.com" },
        type: "control_textbox",
        processedAnswer: "test@example.com",
      },
      {
        qid: "2",
        answer: { text: "21" },
        type: "control_textbox",
        processedAnswer: "21",
      },
      {
        qid: "3",
        type: "control_fullname",
        answer: {
          first: "Ege Emir",
          last: "Özkan",
        },
        processedAnswer: "Ege Emir Özkan",
      },
      {
        qid: "4",
        answer: { text: "Tertiary" },
        type: "control_radio",
        processedAnswer: "Tertiary",
      },
      {
        qid: "5",
        type: "control_checkbox",
        answer: ["Vegan", "Vegeterian", "Other"],
        processedAnswer: "Vegan; Vegeterian; Other:",
      },
      {
        qid: "6",
        type: "control_radio",
        answer: { text: "Wednesday" },
        processedAnswer: "Wednesday",
      },
      {
        qid: "7",
        type: "control_checkbox",
        answer: ["Tuesday", "Thursday"],
        processedAnswer: "Tuesday; Thursday",
      },
    ]),
  },
};
