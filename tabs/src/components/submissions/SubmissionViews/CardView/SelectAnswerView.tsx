import { Flex, Pill, PillGroup, Segment } from "@fluentui/react-northstar";
import I from "immutable";

interface SelectAnswerViewProps {
  /**
   * A list of strings selected by the user.
   */
  options: I.List<string>;
}

/**
 * Renders a group of options selected by a user.
 */
export default function SelectAnswerView({ options }: SelectAnswerViewProps) {
  return (
    <Segment styles={{ width: "100%" }} color="red">
      <Flex>
        <PillGroup aria-label="User selected options">
          {options.map((option, index) => (
            <Pill content={option} key={`${option}${index}`} />
          ))}
        </PillGroup>
      </Flex>
    </Segment>
  );
}
