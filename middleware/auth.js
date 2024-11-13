import jwt from 'jsonwebtoken'


const userAuth = async (req, res, next) => {
  // Check if Authorization header exists and follows 'Bearer <token>' format
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.send({ success: false, message: "Not authorized, Please Login Again" });
  }

  // Extract the token from the 'Bearer <token>' format
  const token = authHeader.split(' ')[1];
  
  try {
    // Verify the token
    const decode_token = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decode_token.id;

    next();

  } catch (error) {
    console.log(error.message);
    return res.send({ success: false, message: error.message });
  }
};

export default userAuth;