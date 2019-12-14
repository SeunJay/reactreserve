import React from "react";
import ProductList from "../components/Index/ProductList";
import axios from "axios";

function Home({ products }) {
  return <ProductList products={products} />;
}

Home.getInitialProps = async function() {
  const url = "http://localhost:3000/api/products";
  const response = await axios.get(url);
  return { products: response.data };
};

export default Home;
