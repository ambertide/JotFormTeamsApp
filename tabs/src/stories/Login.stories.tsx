import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Login from "components/Login";

export default {
  title: "Login",
  component: Login,
} as ComponentMeta<typeof Login>;

const Template = (args: any) => <Login {...args} />;

export const Default = Template.bind({});
