import reduxState from "interfaces/reduxState";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormList } from "components/Tab";
import { TeamSelector } from "components/Tab";
import { ArrowLeftIcon, Dialog, Flex, Loader } from "@fluentui/react-northstar";
import useNavigation from "hooks/useNavigation";
import { useState } from "react";
import { getChannelsInTeam } from "api/AzureADApi";
import { RequestSendPollAction } from "interfaces/reduxActions";
import { selectIsAzureADAuth, selectJFApiKey } from "rxutils/selectors";
import { Login } from "@microsoft/mgt-react";

export default function FormsPage() {
  const forms = useSelector((auth: reduxState) => auth.forms);
  const JFApiKey = useSelector(selectJFApiKey);
  const [selectedFormID, setSelectedFormID] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Sidepanel.
  const dispatch = useDispatch();
  const navigateToMainPage = useNavigation("/tab");
  const teams = useSelector((state: reduxState) => state.teams);
  const isAzureADAuth = useSelector(selectIsAzureADAuth);
  const navigateToAuth = useNavigation("/auth");
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
  if (isAzureADAuth) {
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
            onClose={() => {
              setSelectedFormID("");
              setIsOpen(false);
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
              onFormSelect={(formID: string, formName: string) => {
                setSelectedFormID(formID);
                setIsOpen(true);
              }}
            />
          )}
        </Flex>
      </>
    );
  } else {
    return (
      <Dialog
        content="In order access your Teams, we need extra permissions, you will now be redirected to your Azure AD account where you can grant permissions to our application."
        onConfirm={navigateToAuth}
        open={!isAzureADAuth}
        confirmButton={<Login />}
      />
    );
  }
}
