import { Flex, Segment, Text } from "@fluentui/react-northstar";

interface MessageSegmentProps {
  /** Message to be shown in the segment. */
  message: string;
  /** Type of the message. */
  type: "information" | "success" | "warning";
}

/**
 * A small segment that gives information about an event,
 * possibly a success, failure or information.
 */
export default function MessageSegment({ message, type }: MessageSegmentProps) {
  return (
    <Flex hAlign="center" vAlign="center">
      <Segment>
        <Flex column>
          <Text content="No graphable questions in these submissions" weight="bold" />
        </Flex>
      </Segment>
    </Flex>
  );
}
