import jwt from 'jsonwebtoken';

const jwtUsuario =(param)=>{
    const token = jwt.sign({param}, process.env.JWT_SECRET, {
        expiresIn:"1d"
    })
    return token
}

export default jwtUsuario