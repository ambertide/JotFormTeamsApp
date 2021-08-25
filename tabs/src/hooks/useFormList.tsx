import { formsRequestAction } from "interfaces/reduxActions";
import reduxState from "interfaces/reduxState";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectJFApiKey } from "rxutils/selectors";

/**
 * Connect to the global redux state and upon being triggered by
 * an external source, refresh the forms list, adding new elements
 * as needed.
 * @returns
 */
export default function useFormList() {
  // Stores the index of the last fetched form
  const forms = useSelector((state: reduxState) => state.forms);
  const [lastFetched, setLastFetched] = useState(forms.size);
  const apiKey = useSelector(selectJFApiKey);
  const dispatch = useDispatch();
  const fetchForms = useCallback(
    // This callback is used for fetching forms.
    (visibleStopIndex) => {
      // With this check we make sure to run the fetch only once.
      if (visibleStopIndex < lastFetched - 5 || forms.size > lastFetched) {
        if (forms.size > lastFetched) {
          setLastFetched(forms.size);
        }
        return; // For each offset.
      }
      dispatch<formsRequestAction>({
        type: "FORMS_REQUEST",
        apiKey: apiKey,
        limit: 20,
        offset: lastFetched,
      });
      setLastFetched((prevLastFetched) => prevLastFetched + 20);
    },
    [dispatch, lastFetched, setLastFetched]
  );
  useEffect(() => {
    fetchForms(forms.size);
  }, [fetchForms]);
  const ensureFormContinuity = useCallback(
    (visibleStopIndex) => {
      if (visibleStopIndex >= lastFetched - 5) {
        // We have a buffer of five elements,
        fetchForms(visibleStopIndex);
        // This is necessary to avoid constantly fetching.
      }
    },
    [dispatch, apiKey, forms.size, fetchForms, lastFetched]
  );
  return { forms, ensureFormContinuity };
}
