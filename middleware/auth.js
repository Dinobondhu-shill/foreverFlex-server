import jwt from 'jsonwebtoken'


const userAuth = async (req, res, next)=>{
  const token = req.header;
  if(!token){
    return res.send({success:false, message:"Not authorized, Please Login Again"})
  }
  try {
    
    const decode_token = jwt.verify(token, process.env.JWT_SECRET)
    req.body.userId = decode_token.id
    next()

  } catch (error) {
    console.log(error.message)
    return res.send({success:false, message:error.message})
  }


}

export default userAuth