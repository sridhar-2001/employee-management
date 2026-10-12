
import { useState, useEffect } from "react";
import axios from "axios";

function useFetchData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(url);

        if (isMounted) {
          setData(response.data.users || response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load employees. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetchData;
