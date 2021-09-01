import { useCallback } from "react";
import { useHistory } from "react-router-dom";

/**
 * Creates a callback function that can be called to
 * navigate to a certain page.
 *
 * @param page: Page that will be navigated to when the callback
 * function is executed.
 * @return a callback function that will navigate the user to the
 * page.
 */
export default function useNavigation(page: string): () => void {
  const history = useHistory();
  return useCallback(() => {
    history.push(page);
  }, [history, page]);
}
