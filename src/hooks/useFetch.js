import { useState } from 'react';

const useFetch = (handler) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fetch = async (...args) => {
    try {
      setLoading(true);
      const result = await handler(...args);
      setResponse(result);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
      setResponse([]);
    }
  };

  return [response, loading, error, fetch];
};

export default useFetch;
