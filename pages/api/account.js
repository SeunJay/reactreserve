import User from "../../models/User";
import jwt from "jsonwebtoken";
import connectDB from "../../utils/connectDb";

connectDB();

export default async (req, res) => {
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
    res.status(403).send("Invalid Token!")
  }
};
