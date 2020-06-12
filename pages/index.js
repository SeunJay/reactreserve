import React from "react";
import ProductList from "../components/Index/ProductList";
import ProductPagination from "../components/Index/ProductPagination";
import axios from "axios";
import baseURL from "../utils/baseUrl";

function Home({ products, totalPages }) {
  return (
    <>
      <ProductList products={products} />
      <ProductPagination totalPages={totalPages} />
    </>
  );
}

Home.getInitialProps = async function(ctx) {
  const page = ctx.query.page ? ctx.query.page : "1";
  const size = 9;
  const url = `https://cors-anywhere.herokuapp.com/${baseURL}/api/products`;
  const payload = { params: { page, size } };
  const response = await axios.get(url, payload);
  return response.data;
};

export default Home;
