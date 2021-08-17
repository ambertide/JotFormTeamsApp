import {
  ArrowLeftIcon,
  Button,
  CloseIcon,
  ComponentSlotStyle,
  Divider,
  Flex,
  Header,
  List,
  Loader,
  Segment,
  SegmentProps,
} from "@fluentui/react-northstar";
import I from "immutable";
import { AzureChannelMetadata, AzureTeamMetadata } from "interfaces/AzureTypes";
import { useCallback, useEffect, useState } from "react";
interface TeamSelectorProps {
  /**
   * An immutable list of Microsoft Teams Teams Metadata.
   */
  teams: I.List<AzureTeamMetadata>;
  /**
   * An ansychronous function that returns a list of channels
   *  for a given team.
   */
  getChannels: (teamID: string) => Promise<I.List<AzureChannelMetadata>>;
  /**
   * Callback function to execute when user selects a channel.
   */
  onChannelSelect: (teamsID: string, channelID: string) => void;
  /**
   * Extra styles to be applied to the component.
   */
  styles?: ComponentSlotStyle<SegmentProps, any>;
  /**
   * Callback to be executed on close.
   */
  onClose: () => void;
}

export default function TeamSelector(props: TeamSelectorProps) {
  const { teams, styles, getChannels, onChannelSelect, onClose } = props;
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [channels, setChannels] = useState<I.List<AzureChannelMetadata>>(I.List());
  const cleanSelectedTeam = useCallback(() => {
    setSelectedTeam("");
    setChannels(I.List());
  }, [setSelectedTeam, setChannels]);
  useEffect(() => {
    if (selectedTeam === "") {
      return;
    } else {
      getChannels(selectedTeam).then((channels) => {
        setChannels(channels);
      });
    }
  }, [selectedTeam, setChannels, getChannels]);
  return (
    <Segment styles={{ width: "320px", minHeight: "100%", ...styles }}>
      <Flex column>
        <Flex styles={{ width: "100%" }}>
          <Header as="h3" content={"Share your poll"} />
          <Button
            styles={{
              marginLeft: "auto",
              marginTop: "auto",
              marginBottom: "auto",
            }}
            icon={selectedTeam === "" ? <CloseIcon /> : <ArrowLeftIcon />}
            iconOnly
            onClick={selectedTeam === "" ? onClose : cleanSelectedTeam}
          />
        </Flex>
        <Divider content={`Select a ${selectedTeam === "" ? "Team" : "Channel"}`} />
        {selectedTeam === "" ? (
          teams === undefined ? (
            <Loader />
          ) : (
            <List
              navigable
              items={teams
                .map((team) => {
                  return {
                    key: team.id,
                    header: team.displayName,
                    content: { content: team.description, truncate: true },
                    onClick: () => {
                      setSelectedTeam(team.id);
                    },
                  };
                })
                .toArray()}
            />
          )
        ) : channels.isEmpty() ? (
          <Loader />
        ) : (
          <List
            navigable
            items={channels
              .map((channel) => {
                return {
                  key: channel.id,
                  header: channel.displayName,
                  content: { content: channel.description, truncate: true },
                  onClick: () => {
                    onChannelSelect(selectedTeam, channel.id);
                  },
                };
              })
              .toArray()}
          />
        )}
      </Flex>
    </Segment>
  );
}
