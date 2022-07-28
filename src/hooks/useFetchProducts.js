import { useState, useEffect } from "react";
import axios from "axios";

function useFetchProducts() {
  const baseUrl = "https://bootcamp.akbolat.net/products";
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
        localStorage.setItem("products", JSON.stringify(res.data));
      })
      .catch((err) => {
        setLoading(false);
        setError("An error occurred. Awkward..");
      });
  };

  const getData = () => {
    const products = localStorage.getItem("products");
    if (products) {
      setData(JSON.parse(products));
    } else {
      fetchData();
    }
  };

  useEffect(() => {
    getData();
  }, [baseUrl]);

  return { data, loading, error };
}
export default useFetchProducts;
