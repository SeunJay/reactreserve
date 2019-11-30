import React, { useEffect } from "react";
import axios from "axios";

function Home({ products }) {
  // useEffect(() => {
  //   getProducts();
  // }, []);

  async function getProducts() {
    const url = "http://localhost:3000/api/products";
    const response = await axios.get(url);
    console.log(response.data);
  }

  return <>home</>;
}

Home.getInitialProps = async function() {
  const url = "http://localhost:3000/api/products";
  const response = await axios.get(url);
  return { products: response.data };
};

export default Home;
