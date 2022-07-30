import { useState, useEffect } from "react";
import axios from "axios";

function useFetchCategories() {
  const baseUrl = "https://bootcamp.akbolat.net/categories";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(baseUrl)
      .then((res) => {
        setLoading(false);
        setData(res.data);
        localStorage.setItem("categories", JSON.stringify(res.data));
      })
      .catch((err) => {
        setLoading(false);
        setError("An error occurred. Awkward..");
      });
  };

  const getData = () => {
    const categories = localStorage.getItem("categories");
    if (categories) {
      setData(JSON.parse(categories));
    } else {
      fetchData();
    }
  };

  useEffect(() => {
    getData();
  }, [baseUrl]);

  return { data, loading, error };
}
export default useFetchCategories;
