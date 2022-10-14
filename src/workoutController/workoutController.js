import { registrarUsuarios, loginUsuarios} from '../workoutServices/workoutUsuariosService.js';
import { insertarFavoritos, listarFavoritos, eliminarListaFavoritos } from '../workoutServices/workoutObrasService.js';
import { validatorHandler } from '../middleware/validatorHandler.js'
import { parametrosRegistro, parametrosLogin } from '../schemas/registroUsuarios.Schema.js';
import { parametrosFavoritos, parametroEliminarFavoritos } from '../schemas/favoritos.Schema.js'

const login = (validatorHandler(parametrosLogin, 'body'), (req, res)=>{
    const body = req.body;
    loginUsuarios(body, res);

})

const obras = (validatorHandler(parametrosFavoritos, 'body'), (req,res)=>{
    insertarFavoritos(req,res)
})

const favoritos =  (req,res)=>{
    listarFavoritos(req,res)
}

const eliminarFavoritos = (validatorHandler(parametroEliminarFavoritos, 'params'), (req,res)=>{
    const {id_obra} = req.params;
    eliminarListaFavoritos(id_obra, res, req);

})

const registro = (validatorHandler(parametrosRegistro, 'body'),(req,res)=>{
    const body = req.body;
    registrarUsuarios(body, res)
})

export { login, obras, registro, favoritos,eliminarFavoritos }