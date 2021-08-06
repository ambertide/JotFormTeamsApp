// https://fluentsite.z22.web.core.windows.net/quick-start
import "./App.css";
import { useSelector } from "react-redux";
import reduxState from "../interfaces/reduxState";
import LoginPage from "./LoginPage";
import SelectorPage from "./SelectorPage";
import { Providers, ProviderState } from "@microsoft/mgt";
import { Dialog } from "@fluentui/react-northstar";
import useNavigation from "hooks/useNavigation";
import { Login } from "@microsoft/mgt-react";
import { useEffect } from "react";
/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const user = useSelector((state: reduxState) => state.auth);
  const azureToken = useSelector((state: reduxState) => state.azureToken);
  const navigateToAuth = useNavigation("/auth");
  return (
    <>
      <Dialog
        content="In order access your Teams, we need extra permissions, you will now be redirected to your Azure AD account where you can grant permissions to our application."
        onConfirm={navigateToAuth}
        open={azureToken === ""}
        confirmButton={<Login />}
      />
      {user.isAuth ? <SelectorPage /> : <LoginPage />}
    </>
  );
}
