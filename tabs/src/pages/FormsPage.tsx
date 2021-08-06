import reduxState from "interfaces/reduxState";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormList from "components/FormList";
import TeamSelector from "components/TeamSelector";
import { ArrowLeftIcon, Flex } from "@fluentui/react-northstar";
import useNavigation from "hooks/useNavigation";
import { useState } from "react";
import Modal from "react-modal";
import { getChannelsInTeam, postMessageToChannel } from "api/AzureADApi";
import { toast } from "react-toastify";
import { RequestSendPollAction } from "interfaces/reduxActions";

export default function FormsPage() {
  const forms = useSelector((auth: reduxState) => auth.forms);
  const user = useSelector((auth: reduxState) => auth.auth);
  const [selectedFormID, setSelectedFormID] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Sidepanel.
  const dispatch = useDispatch();
  const navigateToMainPage = useNavigation("/tab");
  const teams = useSelector((state: reduxState) => state.teams);
  const onChannelSelect = useCallback(
    (teamID: string, channelID: string) => {
      dispatch<RequestSendPollAction>({
        type: "SEND_POLL_REQUEST",
        channelID,
        teamID,
        formID: selectedFormID,
        apiKey: user.APIKey,
      });
      setSelectedFormID("");
      setIsOpen(false);
    },
    [selectedFormID, setSelectedFormID, setIsOpen, user, dispatch]
  );
  useEffect(() => {
    dispatch({ type: "FORMS_REQUEST", apiKey: user.APIKey });
    dispatch({ type: "AZURE_TEAMS_REQUEST" });
  }, [dispatch, user.APIKey]);
  return (
    <>
      {isOpen ? (
        <TeamSelector
          teams={teams}
          getChannels={getChannelsInTeam}
          onChannelSelect={onChannelSelect}
          styles={{
            position: "absolute",
            zIndex: 2,
            top: 0,
            right: 0,
          }}
        />
      ) : null}
      <Flex hAlign="center" fill>
        <FormList
          forms={forms}
          isLite={false}
          buttonOnClick={navigateToMainPage}
          buttonIcon={<ArrowLeftIcon />}
          buttonText={"Return to Main Page"}
          onFormSelect={(formID: string) => {
            setSelectedFormID(formID);
            setIsOpen(true);
          }}
        />
      </Flex>
    </>
  );
}
