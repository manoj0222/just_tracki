import { useState } from "react";

type Props = {
  callback: (...args: any[]) => Promise<any>;
};

const useFetch = ({ callback }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const fn = async (...args: any[]) => {
    setIsLoading(true);
    try {
      const responseData = await callback(...args);
      setData(responseData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return { isLoading, data, error, fn };
};

export default useFetch;
