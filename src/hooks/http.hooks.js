import { useState, useEffect, useRef } from "react";

export const useJsonFetch = (
  url,
  method = "GET",
  body = null,
  headers = {}
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);

      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }

        const response = await fetch(process.env.REACT_APP_NEWS_URL + url, {
          method,
          body,
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
