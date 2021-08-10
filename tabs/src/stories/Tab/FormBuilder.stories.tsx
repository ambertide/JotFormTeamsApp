import { ComponentStory, ComponentMeta } from "@storybook/react";
import FormBuilder from "components/FormBuilder";

export default {
  title: "Tab/FormBuilder",
  component: FormBuilder,
} as ComponentMeta<typeof FormBuilder>;

const Template: ComponentStory<typeof FormBuilder> = (args: any) => <FormBuilder {...args} />;

export const TabFormBuilder = Template.bind({});
