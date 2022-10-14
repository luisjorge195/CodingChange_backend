import Joi from 'joi';

const nombre = Joi.string().required();
const password = Joi.string().required();
const email = Joi.string().required();

const parametrosRegistro = Joi.object({
    nombre,
    password,
    email
})

const parametrosLogin= Joi.object({
    email,
    password
})

export {parametrosRegistro, parametrosLogin}