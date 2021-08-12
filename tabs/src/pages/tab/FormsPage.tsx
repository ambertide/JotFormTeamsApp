import reduxState from "interfaces/reduxState";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormList } from "components/Tab";
import { TeamSelector } from "components/Tab";
import { ArrowLeftIcon, Flex, Loader } from "@fluentui/react-northstar";
import useNavigation from "hooks/useNavigation";
import { useState } from "react";
import { getChannelsInTeam } from "api/AzureADApi";
import { RequestSendPollAction } from "interfaces/reduxActions";
import { selectJFApiKey } from "rxutils/selectors";

export default function FormsPage() {
  const forms = useSelector((auth: reduxState) => auth.forms);
  const JFApiKey = useSelector(selectJFApiKey);
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
        apiKey: JFApiKey,
      });
      setSelectedFormID("");
      setIsOpen(false);
    },
    [selectedFormID, setSelectedFormID, setIsOpen, JFApiKey, dispatch]
  );
  useEffect(() => {
    dispatch({ type: "FORMS_REQUEST", apiKey: JFApiKey });
    dispatch({ type: "AZURE_TEAMS_REQUEST" });
  }, [dispatch, JFApiKey]);
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
        {forms.isEmpty() ? (
          <Loader />
        ) : (
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
        )}
      </Flex>
    </>
  );
}
