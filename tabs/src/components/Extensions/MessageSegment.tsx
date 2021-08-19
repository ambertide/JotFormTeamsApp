import { AcceptIcon, BanIcon, Flex, InfoIcon, Segment, Text } from "@fluentui/react-northstar";
import I from "immutable";
import { useMemo } from "react";

type MessageType = "info" | "success" | "error";

interface MessageSegmentProps {
  /** Message to be shown in the segment. */
  message: string;
  /** Type of the message. */
  messageType: MessageType;
}

const icons = I.Map<MessageType, any>({
  error: BanIcon,
  info: InfoIcon,
  success: AcceptIcon,
});

const color = I.Map<MessageType, string>({
  error: "#8E192E",
  info: "#323131",
  success: "#237B4B",
});

/**
 * A small segment that gives information about an event,
 * possibly a success, failure or information.
 */
export default function MessageSegment({ message, messageType }: MessageSegmentProps) {
  const Icon = useMemo(() => icons.get(messageType), [messageType]);
  return (
    <Flex hAlign="center" vAlign="center" fill>
      <Segment styles={{ width: "30%", height: "30%", overflow: "auto" }}>
        <Flex column hAlign="center">
          <Icon
            size="largest"
            outline
            styles={{ transform: "scale(3)", margin: "60px", color: color.get(messageType) }}
          />
          <Text
            content={message}
            weight="bold"
            size="largest"
            styles={{ color: color.get(messageType) }}
          />
        </Flex>
      </Segment>
    </Flex>
  );
}
