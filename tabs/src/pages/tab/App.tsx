// https://fluentsite.z22.web.core.windows.net/quick-start
import "./../App.css";
import { useSelector } from "react-redux";
import LoginPage from "./LoginPage";
import SelectorPage from "./SelectorPage";
import { Dialog } from "@fluentui/react-northstar";
import useNavigation from "hooks/useNavigation";
import { Login } from "@microsoft/mgt-react";
import { selectIsAzureADAuth, selectIsJFAuth } from "rxutils/selectors";
import { useEffect } from "react";
import { pingProxy } from "api/JFPollApi";
/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const isJFAuth = useSelector(selectIsJFAuth);
  const isAzureADAuth = useSelector(selectIsAzureADAuth);
  const navigateToAuth = useNavigation("/auth");
  useEffect(() => {
    pingProxy(); // This wakes up the server, because free heroku servers sleep.
  }, []);
  return (
    <>
      <Dialog
        content="In order access your Teams, we need extra permissions, you will now be redirected to your Azure AD account where you can grant permissions to our application."
        onConfirm={navigateToAuth}
        open={!isAzureADAuth}
        confirmButton={<Login />}
      />
      {isJFAuth ? <SelectorPage /> : <LoginPage />}
    </>
  );
}
