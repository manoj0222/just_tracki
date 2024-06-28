import { useState, useCallback } from "react";

type Props = {
  callback: (...args: any[]) => Promise<any>;
};

const useFetch = ({ callback }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const fn = useCallback(async (...args: any[]) => {
    setIsLoading(true);
    setError("");
    try {
      const responseData = await callback(...args);
      setData(responseData);
    } catch (error) {
      setError("Error while Fetching Data");
    } finally {
      setIsLoading(false);
    }
  }, [callback]);

  return { isLoading, data, error, fn };
};

export default useFetch;
