import SubmissionViewer from "components/submissions/SubmissionViewer";
import { useParams } from "react-router-dom";
import { Button, Flex } from "@fluentui/react-northstar";
import { useSelector } from "react-redux";
import { selectJFApiKey } from "rxutils/selectors";
import { getFormQuestions, getFormSubmissions } from "api/JFApi";
import { registerUser } from "api/JFPollApi";
import useNavigation from "hooks/useNavigation";
import { useCallback } from "react";
import useFormData from "hooks/useFormData";

interface SubmissionsViewURLParams {
  formID: string;
  formName: string;
}
export default function SubmissionsViewerPage() {
  const { formID, formName } = useParams<SubmissionsViewURLParams>();
  const apiKey = useSelector(selectJFApiKey);
  const navigateToMainPage = useNavigation("/results");
  const getQuestions = useCallback(() => {
    // Get questions using JF API.
    return getFormQuestions(apiKey, formID);
  }, [apiKey, formID]);
  const register = useCallback(() => {
    // Register and return user UUID.
    return registerUser(apiKey, formID);
  }, [apiKey, formID]);
  const getSubmissions = useCallback(() => {
    // Get the submissions using JF API.
    return getFormSubmissions(apiKey, formID);
  }, [apiKey, formID]);
  const { formQuestions, formSubmissions, formDistributions } = useFormData(
    formName,
    getQuestions,
    register,
    getSubmissions
  );

  return (
    <Flex hAlign="center" fill>
      <SubmissionViewer
        formTitle={formName}
        formQuestions={formQuestions}
        submissions={formSubmissions}
        distributions={formDistributions}
        navButton={<Button content="Return to Main Page" onClick={navigateToMainPage} />}
      />
    </Flex>
  );
}
