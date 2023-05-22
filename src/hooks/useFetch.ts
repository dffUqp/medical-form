import type { Options } from 'ky';
import { useEffect, useState } from 'react';
import { ky } from 'src/lib';

interface State<T> {
  data?: T;
  error?: boolean;
}

const useFetch = <T = unknown>(url: string, options?: Options): State<T> => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ky(url, {
          method: 'get',
          ...options,
        });
        const json = (await res.json()) as T;
        setData(json);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error };
};

export default useFetch;
