import reduxState from "interfaces/reduxState";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import I from "immutable";
import FormList from "components/FormList";

export default function FormsPage() {
  const forms = useSelector((auth: reduxState) => auth.forms);
  const user = useSelector((auth: reduxState) => auth.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FORMS_REQUEST", apiKey: user.APIKey });
  }, [dispatch, user.APIKey]);
  return <FormList forms={forms} />;
}
