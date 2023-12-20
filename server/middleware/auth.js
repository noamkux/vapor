import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    
    const token = req.header("Authorization");
    if (!token) {
      console.log("Unauthorized no token provided");
      return res.status(401).send("Unauthorized no token provided");
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Add logging here to see the payload

    req.payload = payload;
    next();
  } catch (error) {
    console.log(error);
    // Add more specific error handling based on the error type
    return res.status(401).send("Unauthorized: Invalid token");
  }
};
