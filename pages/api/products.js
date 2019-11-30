import products from "../../static/products.json";
import connectDB from "../../utils/connectDb";

connectDB();

export default (req, res) => {
  res.status(200).json(products);
};
