import CryptoJS from 'crypto-js';
import jwtUsuario from '../helpers/jwt.js'
import { pool } from '../database/workout.js';

const registrarUsuarios = async(data, res)=>{
    const { email }= data;
    const existeUsuario = await pool.query('select * from usuarios where email = $1', [email]);
    if(existeUsuario.rowCount!==0){
        const error = new Error('El usuario ya está registrado')
        res.status(403).json({msg: error.message})
    }
    try {
        const hashPassword = CryptoJS.AES.encrypt(data.password, process.env.PASS_SECRET).toString();
        await pool.query('insert into usuarios (nombre, password, email) values($1, $2,$3)',[data.nombre, hashPassword, data.email]);
        res.status(201).json({ msg: 'Usuario registrado correctamente' });
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const loginUsuarios = async(data, res)=>{
    try {
        
        const credenciales = await pool.query('select * from usuarios where email =$1 ', [data.email]);
        if(credenciales.rowCount === 0) return res.status(404).json({ msg: 'Credenciales incorrectas' });

        const decryptPassword = CryptoJS.AES.decrypt(credenciales?.rows[0].password, process.env.PASS_SECRET);
        if(decryptPassword.toString(CryptoJS.enc.Utf8) !== data.password) return (res.status(404).json({ msg: 'Password incorrecto' })); 
        
        res.status(201).json({
            nombre: credenciales.rows[0].nombre,
            correo: credenciales.rows[0].email,
            token: jwtUsuario(credenciales.rows[0].id_usuario)
        })

       
    } catch (error) {
        res.status(500).json({ msg: error.message }) 
    }
}  
 

export { loginUsuarios, registrarUsuarios };
