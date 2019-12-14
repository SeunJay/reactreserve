import React from "react";
import ProductList from "../components/Index/ProductList";
import axios from "axios";
import baseURL from "../utils/baseUrl"

function Home({ products }) {
  return <ProductList products={products} />;
}

Home.getInitialProps = async function() {
  const url = `${baseURL}/api/products`;
  const response = await axios.get(url);
  return { products: response.data };
};

export default Home;
