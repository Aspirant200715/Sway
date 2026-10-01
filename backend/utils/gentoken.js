import jwt from "jsonwebtoken"

const gentoken = (userId) => {
   return  jwt.sign({userId},process.env.jwt_secret,{expiresIn : '21d'})
}

export default gentoken