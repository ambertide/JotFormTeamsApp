import { Segment, Flex, ContentIcon, EditIcon } from "@fluentui/react-northstar";
import ButtonWithImage from "components/Extensions/ButtonWithImage";
import useNavigation from "hooks/useNavigation";

export default function SelectorPage() {
  const navigateToForms = useNavigation("/forms");
  const navigateToCreate = useNavigation("/create");
  return (
    <Flex hAlign="center" fill>
      <Segment styles={{ width: "90%", height: "90%" }}>
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
