import { useState, useEffect } from "react";

export const useJsonFetch = (
  url,
  method = "GET",
  body = null,
  headers = {}
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [newBody, setNewBody] = useState(body);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);

      try {
        if (newBody) {
          setNewBody(JSON.stringify(newBody));
          headers["Content-Type"] = "application/json";
        }

        const response = await fetch(process.env.REACT_APP_NEWS_URL + url, {
          method,
          newBody,
          headers,
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Ошибка №" + response.status + ". " + data.status);
        }

        setData(data);
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return { data, loading, error };
};
