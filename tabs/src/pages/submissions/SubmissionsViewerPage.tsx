import SubmissionViewer from "components/submissions/SubmissionViewer";
import { useParams } from "react-router-dom";
import { Button, Flex } from "@fluentui/react-northstar";
import { useSelector } from "react-redux";
import { selectJFApiKey } from "rxutils/selectors";
import { getFormQuestions, getFormSubmissions } from "api/JFApi";
import { registerUser } from "api/JFPollApi";
import useNavigation from "hooks/useNavigation";
import { useCallback, useState } from "react";
import useFormData from "hooks/useFormData";
import { useEffect } from "react";

interface SubmissionsViewURLParams {
  formID: string;
  formName: string;
}
export default function SubmissionsViewerPage() {
  const { formID, formName } = useParams<SubmissionsViewURLParams>();
  const apiKey = useSelector(selectJFApiKey);
  const navigateToMainPage = useNavigation("/results");
  const [currentPage, setCurrentPage] = useState(0);
  // Since the JF Api does not give me back the number of submissions,
  // The way to check if we are on the last page is to fetch the next
  // batch of submissions, if they're empty, we are in the last page.
  const [isLastPage, setIsLastPage] = useState(false);
  useEffect(() => {
    getFormSubmissions(apiKey, formID, 20, (currentPage + 1) * 20).then((submissions) =>
      setIsLastPage(submissions.length <= 0)
    );
  }, [setIsLastPage, apiKey, currentPage, formID]);
  const getQuestions = useCallback(() => {
    // Get questions using JF API.
    return getFormQuestions(apiKey, formID);
  }, [apiKey, formID]);
  const register = useCallback(() => {
    // Register and return user UUID.
    return registerUser(apiKey, formID);
  }, [apiKey, formID]);
  const getSubmissions = useCallback(() => {
    console.log("Requested submissions.");
    // Get the submissions using JF API.
    return getFormSubmissions(apiKey, formID, 20, currentPage * 20);
  }, [apiKey, formID, currentPage]);
  const { formQuestions, formSubmissions, formDistributions, hasLoaded } = useFormData(
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
        isLoading={!hasLoaded} // We can show some data even if some of it has not loaded yet.
        navButton={<Button content="Return to Main Page" onClick={navigateToMainPage} />}
        onPageChange={(page) => setCurrentPage(page)}
        isLastPage={isLastPage}
      />
    </Flex>
  );
}
