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

export function useActionInterval<T>(
  action: () => Promise<T>,
  interval: number,
  dependencies = [],
): [T | null, boolean, Error | null] {
  const [value, setValue] = useState<T | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const f = () =>
      action()
        .then(setValue)
        .catch(setError)
        .finally(() => setLoaded(true));

    f();

    const inv = setInterval(f, interval);

    return () => clearInterval(inv);
  }, dependencies);

  return [value, loaded, error];
}
