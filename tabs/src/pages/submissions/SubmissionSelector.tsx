import { Loader, Flex, ArrowLeftIcon } from "@fluentui/react-northstar";
import { FormList } from "components/Tab";
import useFormList from "hooks/useFormList";
import { formsRequestAction } from "interfaces/reduxActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectJFApiKey } from "rxutils/selectors";
import { showInfo } from "utils/messaging";

export default function SubmissionSelector() {
  const { forms, ensureFormContinuity } = useFormList();
  const apiKey = useSelector(selectJFApiKey);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<formsRequestAction>({ type: "FORMS_REQUEST", apiKey: apiKey });
  }, [apiKey, dispatch]);
  return (
    <Flex hAlign="center" fill>
      {forms.isEmpty() ? (
        <Loader />
      ) : (
        <FormList
          buttonOnClick={() => {
            showInfo("Logged out of your account.");
            dispatch({ type: "AUTH_LOGOUT" });
          }}
          buttonIcon={<ArrowLeftIcon />}
          buttonText={"Logout"}
          isLite={false}
          forms={forms}
          onFormSelect={(formID, formName) => {
            history.push(`/results/${formID}/${formName}`);
          }}
          onFormScroll={ensureFormContinuity}
        />
      )}
    </Flex>
  );
}
