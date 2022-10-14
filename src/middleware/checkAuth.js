import jwt from 'jsonwebtoken'
import {pool} from '../database/workout.js'
const checkAuth = async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.usuario = await pool.query('select id_usuario from usuarios where id_usuario=$1',[decoded.param])
            
            return next()
        } catch (error) {
            return res.status(404).json({msg:'Hubo un error'})
        }
    }

    if(!token){
        const error = new Error("Token no válido");
        return res.status(401).json({msg: error.message})
    }


}

export default checkAuth;