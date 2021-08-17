import {
  Button,
  ContactCardIcon,
  Flex,
  PollIcon,
  Segment,
  TableIcon,
} from "@fluentui/react-northstar";
import { ViewType } from "interfaces/ViewTypes";
import { Dispatch, SetStateAction } from "react";
import I from "immutable";
import { useMemo } from "react";
import { CSSProperties } from "react";

const buttonPosibilities: I.Map<ViewType, any> = I.Map<ViewType, any>({
  List: <TableIcon />,
  Cards: <ContactCardIcon />,
  Graph: <PollIcon />,
});

interface ViewSwitcherProps {
  currentState: ViewType;
  setCurrentState: Dispatch<SetStateAction<ViewType>>;
  style?: CSSProperties;
}

/**
 * A group of buttons to switch the current view.
 */
export default function ViewSwitcher({ currentState, setCurrentState, style }: ViewSwitcherProps) {
  const buttons = useMemo(
    () =>
      buttonPosibilities
        .remove(currentState)
        .map((icon, state) => ({
          key: state,
          icon: icon,
          iconOnly: true,
          title: state,
          onClick: () => setCurrentState(state),
        }))
        .valueSeq()
        .toArray(),
    [setCurrentState, currentState]
    // Set the buttons to an array of buttons that does not contain the current state.
  );
  return <Button.Group style={style} buttons={buttons} />;
}
