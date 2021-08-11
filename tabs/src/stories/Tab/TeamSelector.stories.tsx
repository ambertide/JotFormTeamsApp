import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TeamSelector } from "components/Tab";
import I from "immutable";
import { AzureTeamMetadata, AzureChannelMetadata } from "interfaces/AzureTypes";

export default {
  title: "Tab/TeamSelector",
  component: TeamSelector,
  argTypes: {
    onChannelSelect: {
      control: { disable: true },
    },
    getChannels: {
      control: { disable: true },
    },
  },
} as ComponentMeta<typeof TeamSelector>;

const Template: ComponentStory<typeof TeamSelector> = (args: any) => <TeamSelector {...args} />;

export const TeamSelectorExample = Template.bind({});

TeamSelectorExample.args = {
  teams: I.List<AzureTeamMetadata>([
    {
      id: "team1",
      displayName: "Your First Team",
      description: "This is your first team, it will load very fast.",
    },
    {
      id: "team2",
      displayName: "Your Second Team",
      description: "This is your second team, it will load much slower.",
    },
  ]),
  onChannelSelect: (channelID: string) => {
    console.log(channelID);
  },
  getChannels: async (teamID: string): Promise<I.List<AzureChannelMetadata>> => {
    const example = I.List<AzureChannelMetadata>([
      {
        id: "channel1",
        createdDateTime: "12-2-24",
        displayName: "Your First Channel",
        description: "This is your first channel.",
        membershipType: "",
      },
      {
        id: "channel2",
        createdDateTime: "12-2-24",
        displayName: "Your Second Channel",
        description: "This is your second channel.",
        membershipType: "",
      },
      {
        id: "channel3",
        createdDateTime: "12-2-24",
        displayName: "Your Third Channel",
        description: "This is your third channel.",
        membershipType: "",
      },
      {
        id: "channel4",
        createdDateTime: "12-2-24",
        displayName: "Your Fourth Channel",
        description: "This is your fourth channel.",
        membershipType: "",
      },
      {
        id: "channel5",
        createdDateTime: "12-2-24",
        displayName: "Your Fifth Channel",
        description: "This is your fifth channel.",
        membershipType: "",
      },
    ]);
    if (teamID === "team1") {
      return example;
    } else {
      await new Promise((r) => setTimeout(r, 2000)); // From https://stackoverflow.com/a/39914235/6663851
      return example;
    }
  },
};
