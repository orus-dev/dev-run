import { useEffect, useState } from "react";

export default function useAction<T>(
  action: () => Promise<T>,
  dependencies = [],
): [T | null, boolean, Error | null] {
  const [value, setValue] = useState<T | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    action()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoaded(true));
  }, dependencies);

  return [value, loaded, error];
}
