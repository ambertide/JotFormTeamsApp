import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Login from "components/Login";

export default {
  title: "Login",
  component: Login,
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = (args: any) => <Login {...args} />;

export const TabLogin = Template.bind({});

TabLogin.args = {
  onSubmit: (username: string, password: string) => {
    console.log(`${username} has password ${password}`);
  },
};

export const SideLogin = Template.bind({});

SideLogin.args = {
  onSubmit: (username: string, password: string) => {
    console.log(`${username} has password ${password}`);
  },
  isLite: true,
};
