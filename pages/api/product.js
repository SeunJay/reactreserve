import Product from "../../models/Product";
import Cart from "../../models/Cart";
import connectDB from "../../utils/connectDb";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
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
  try {
    // 1) Delete product by id
    await Product.findByIdAndDelete({ _id });
    // 2) Remove product from all carts, referenced as 'product'
    await Cart.updateMany(
      { "products.product": _id },
      { $pull: { products: { product: _id } } }
    );

    res.status(204).json({});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting product");
  }
};

const handlePostRequest = async (req, res) => {
  try {
    const { name, price, mediaUrl, description } = req.body;

    if (!name || !price || !mediaUrl || !description)
      return res.status(422).send("Product missing one or more fields");

    const newProduct = await Product.create({
      name,
      price,
      description,
      mediaUrl
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error in creating product");
  }
};
