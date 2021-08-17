import { ErrorIcon, Loader, Flex } from "@fluentui/react-northstar";
import { FormList } from "components/Tab";
import { formsAction, formsRequestAction } from "interfaces/reduxActions";
import reduxState from "interfaces/reduxState";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectJFApiKey } from "rxutils/selectors";

export default function SubmissionSelector() {
  const forms = useSelector((state: reduxState) => state.forms);
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
          buttonText={""}
          buttonOnClick={() => {}}
          buttonIcon={<ErrorIcon />}
          isLite={false}
          forms={forms}
          onFormSelect={(formID, formName) => {
            history.push(`/results/${formID}/${formName}`);
          }}
          hideButton
        />
      )}
    </Flex>
  );
}
