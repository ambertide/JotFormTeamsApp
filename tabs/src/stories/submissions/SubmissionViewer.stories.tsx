import { ComponentStory, ComponentMeta } from "@storybook/react";
import I from "immutable";
import SubmissionViewer from "components/submissions/SubmissionViewer";
import { Segment } from "@fluentui/react-northstar";
import { processPollDistributions } from "utils/PollUtils";

export default {
  title: "Submissions/SubmissionViewer",
  component: SubmissionViewer,
  argTypes: {
    answers: {
      control: { disable: true },
    },
  },
} as ComponentMeta<typeof SubmissionViewer>;

const Template: ComponentStory<typeof SubmissionViewer> = (args: any) => (
  <SubmissionViewer {...args} />
);

export const ExampleSubmissionView = Template.bind({});

ExampleSubmissionView.args = {
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
  submissions: {
    formName: "Example Form",
    submissions: I.List([
      {
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
      {
        ipAdress: "127.0.0.1",
        submissionDate: "2021-08-10 14:30:00",
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
    ]),
  },
  distributions: processPollDistributions({
    "4": {
      Tertiary: 4,
      Secondary: 3,
      Primary: 2,
    },
    "5": {
      Vegan: 2,
      Vegeterian: 6,
      "Other:": 2,
      Pescatarian: 2,
      Other: 1,
      Food: 1,
      "Vegan|Vegeterian|Pescatarian|Other": 1,
      "Vegeterian|Pescatarian|Other": 4,
    },
    "6": {
      Wednesday: 8,
      Thursday: 2,
      Sunday: 1,
    },
    "7": {
      Tuesday: 2,
      Monday: 3,
      Wednesday: 1,
      Saturday: 1,
      Thursday: 3,
      "Tuesday|Wednesday|Sunday": 1,
      Sunday: 2,
      Friday: 1,
      "Tuesday|Wednesday|Thursday": 4,
    },
  }),
};
