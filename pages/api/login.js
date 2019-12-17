import connectDB from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDB();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(404).send("No user exists with that email!");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(404).send("Invalid Credentials!");

    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(200).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in user. Please try again later!");
  }
};
