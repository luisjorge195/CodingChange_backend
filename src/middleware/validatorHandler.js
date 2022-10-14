
const validatorHandler = (schema, property)=>{
    return (req,res,next)=>{
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });
        if(error){
            throw new Error(error.details[0].message);
        }
        next();
    }
}

export {validatorHandler}