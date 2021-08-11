import { ComponentStory, ComponentMeta } from "@storybook/react";
import I from "immutable";
import { FormList } from "components/Tab";
import { ArrowLeftIcon } from "@fluentui/react-northstar";

export default {
  title: "Tab/FormList",
  component: FormList,
  argTypes: {
    forms: {
      control: { disable: true },
    },
  },
} as ComponentMeta<typeof FormList>;

const Template: ComponentStory<typeof FormList> = (args: any) => <FormList {...args} />;

export const TabFormsList = Template.bind({});

TabFormsList.args = {
  buttonOnClick: () => {},
  buttonIcon: <ArrowLeftIcon />,
  buttonText: "Return to Main Page",
  forms: I.List([
    {
      id: "2334",
      title: "Example Form",
      url: "https://example.com",
      status: "ENABLED" as const,
      created_at: "12/07/2012 05:50:34",
      updated_at: "12/08/2012 06:50:45",
      count: 23,
    },
    {
      id: "2335",
      title: "Another Example Form",
      url: "https://example.com",
      status: "DISABLED" as const,
      created_at: "12/07/2012 05:50:34",
      updated_at: "12/08/2012 06:50:45",
      count: 23,
    },
  ]),
};
