import {
  Segment,
  Flex,
  ShareGenericIcon,
  Button,
  CanvasAddPageIcon,
} from "@fluentui/react-northstar";
import ButtonWithImage from "components/Extensions/ButtonWithImage";
import useNavigation from "hooks/useNavigation";
import { useDispatch } from "react-redux";
import { showInfo } from "utils/messaging";

export default function SelectorPage() {
  const navigateToForms = useNavigation("/tab/forms");
  const navigateToCreate = useNavigation("/tab/create");
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
        <Flex gap="gap.large" vAlign="center" hAlign="center" style={{ gap: "5%", height: "100%" }}>
          <ButtonWithImage
            icon={ShareGenericIcon}
            buttonText="View and Share Polls"
            onClick={navigateToForms}
          />
          <ButtonWithImage
            icon={CanvasAddPageIcon}
            buttonText="Create New Poll"
            onClick={navigateToCreate}
          />
        </Flex>
      </Segment>
    </Flex>
  );
}
