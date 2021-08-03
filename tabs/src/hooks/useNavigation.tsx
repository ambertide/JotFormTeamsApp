import { useCallback } from "react";
import { useHistory } from "react-router-dom";
export default function useNavigation(page: string): () => void {
  const history = useHistory();
  return useCallback(() => {
    history.push(page);
  }, [history, page]);
}
