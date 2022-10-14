import Joi from 'joi'

const id_obra = Joi.number().required();
const nombre_artista = Joi.string().required();
const titulo_obra = Joi.string().required();
const url_image_obra = Joi.string().required();

const parametrosFavoritos = Joi.object({
    nombre_artista,
    titulo_obra,
    url_image_obra
}) 

const parametroEliminarFavoritos = Joi.object({
    id_obra
})
export {parametrosFavoritos, parametroEliminarFavoritos}