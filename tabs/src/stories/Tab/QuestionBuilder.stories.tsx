import { Segment } from "@fluentui/react-northstar";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import QuestionBuilder from "components/QuestionBuilder";

export default {
  title: "Tab/QuestionBuilder",
  component: QuestionBuilder,
} as ComponentMeta<typeof QuestionBuilder>;

const Template: ComponentStory<typeof QuestionBuilder> = (args: any) => (
  <Segment style={{ width: "fit-content" }}>
    <QuestionBuilder {...args} />
  </Segment>
);

export const TabQuestionBuilder = Template.bind({});
