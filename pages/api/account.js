import User from "../../models/User";
import jwt from "jsonwebtoken";
import connectDB from "../../utils/connectDb";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
};

async function handleGetRequest(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token!");
  }

  try {
    const { userId } = await jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const user = await User.findOne({ _id: userId });

    if (!user) return res.status(404).send("User not found!");

    res.status(200).json(user);
  } catch (error) {
    res.status(403).send("Invalid Token!");
  }
}

async function handlePutRequest(req, res) {
  const { _id, role } = req.body;
  await User.findOneAndUpdate({ _id }, { role });
  res.status(200).send("User role updated");
}
