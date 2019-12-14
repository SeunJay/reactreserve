import Product from "../../models/Product";
import connectDB from "../../utils/connectDb";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
    default:
      res.status(405).send(`Method ${req.method} not allowed!`);
      break;
  }
};

const handleGetRequest = async (req, res) => {
  const { _id } = req.query;
  const product = await Product.findOne({ _id });
  res.status(200).json({ product });
};

const handleDeleteRequest = async (req, res) => {
  const { _id } = req.query;
  console.log(_id);
  await Product.findByIdAndDelete({ _id });
  res.status(204).json({});
};
