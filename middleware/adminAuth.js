import jwt from "jsonwebtoken"

const adminAuth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.send({
      success: false,
      message: "Not Authorized login again"
    })
  }
  const decode_token = jwt.verify(token, process.env.JWT_SECRET)
  if (decode_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
    return res.send({
      success: false,
      message: "No Authorization"
    })
  }
  next()
}
export default adminAuth;