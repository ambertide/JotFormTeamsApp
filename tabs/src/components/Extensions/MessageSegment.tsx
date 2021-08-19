import {
  AcceptIcon,
  BanIcon,
  Flex,
  InfoIcon,
  Loader,
  Segment,
  Text,
} from "@fluentui/react-northstar";
import I from "immutable";
import { useMemo } from "react";

type MessageType = "info" | "success" | "error";

interface MessageSegmentProps {
  /** Message to be shown in the segment. */
  message: string;
  /** Type of the message. */
  messageType: MessageType | "loading";
  /**
   * If true, the message fits inside a custom container.
   */
  fragment?: boolean;
}

const icons = I.Map<MessageType, any>({
  error: BanIcon,
  info: InfoIcon,
  success: AcceptIcon,
});

const color = I.Map<MessageType | "loading", string>({
  error: "#8E192E",
  info: "#323131",
  success: "#237B4B",
  loading: "#6264A7",
});

/**
 * Actual dynamic part of the message.
 */
function MessageFragment({ message, messageType }: MessageSegmentProps) {
  const Indicator = useMemo(() => {
    if (messageType !== "loading") {
      const Icon = icons.get(messageType);
      return (
        <Icon
          size="largest"
          outline
          styles={{ transform: "scale(3)", margin: "60px", color: color.get(messageType) }}
        />
      );
    } else {
      return <Loader size="largest" />;
    }
  }, [messageType]);
  return (
    <Flex column hAlign="center" vAlign="center" fill styles={{ flexGrow: 1 }}>
      {Indicator}
      <Text
        content={message}
        weight="semibold"
        size="largest"
        styles={{ color: color.get(messageType) }}
      />
    </Flex>
  );
}

/**
 * A small segment that gives information about an event,
 * possibly a success, failure or information.
 */
export default function MessageSegment({ fragment, ...props }: MessageSegmentProps) {
  if (fragment) {
    return <MessageFragment {...props} />;
  }
  return (
    <Flex hAlign="center" vAlign="center" fill>
      <Segment styles={{ width: "30%", height: "30%", overflow: "auto" }}>
        <MessageFragment {...props} />
      </Segment>
    </Flex>
  );
}
