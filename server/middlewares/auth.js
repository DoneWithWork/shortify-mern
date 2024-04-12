import jwt from "jsonwebtoken";
export const auth = async (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    req.userId = user.id;
    next();
  });
};
