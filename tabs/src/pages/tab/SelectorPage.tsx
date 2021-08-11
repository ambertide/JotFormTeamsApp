import { Segment, Flex, ContentIcon, Button, EditIcon } from "@fluentui/react-northstar";
import ButtonWithImage from "components/Extensions/ButtonWithImage";
import useNavigation from "hooks/useNavigation";
import { useDispatch } from "react-redux";
import { showInfo } from "utils/messaging";

export default function SelectorPage() {
  const navigateToForms = useNavigation("/forms");
  const navigateToCreate = useNavigation("/create");
  const dispatch = useDispatch();
  return (
    <Flex hAlign="center" fill>
      <Segment styles={{ width: "90%", height: "90%" }}>
        <Button
          onClick={() => {
            showInfo("Logged out of your account.");
            dispatch({ type: "AUTH_LOGOUT" });
          }}
          content="Log Out"
          styles={{ position: "absolute", right: "6%" }}
        />
        <Flex gap="gap.large" vAlign="center" hAlign="center" style={{ height: "100%" }}>
          <ButtonWithImage
            icon={<ContentIcon />}
            buttonText="View Your Polls"
            onClick={navigateToForms}
          />
          <ButtonWithImage
            icon={<EditIcon />}
            buttonText="Create New Poll"
            onClick={navigateToCreate}
          />
        </Flex>
      </Segment>
    </Flex>
  );
}
