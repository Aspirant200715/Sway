import jwt from "jsonwebtoken"

const gentoken = (userId) => {
   return  jwt.sign({userId},process.env.jwt_secret,{expiresIn : '7d'})
}

export default gentoken