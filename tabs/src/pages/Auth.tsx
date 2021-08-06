import * as microsoftTeams from "@microsoft/teams-js";
import { Providers, TeamsProvider } from "@microsoft/mgt";
import { useEffect } from "react";
import { Header } from "@fluentui/react-northstar";

export default function Auth() {
  useEffect(() => {
    TeamsProvider.microsoftTeamsLib = microsoftTeams;
    TeamsProvider.handleAuth();
  }, []);
  return (
    <>
      <Header content="Logging you into your Azure Active Directory." />
    </>
  );
}
