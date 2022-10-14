import { pool } from '../database/workout.js';

const insertarObras = async(_id, _idUsuario, titulo_obra, url_image_obra,res)=>{
    await pool.query('insert into obras (id_artista, id_usuario, titulo_obra, url_image_obra) values($1,$2,$3,$4)',[_id,_idUsuario, titulo_obra, url_image_obra]);
    res.status(201).json({ msg: 'Se guardó en tu lista de favoritos'});
}

const insertarFavoritos = async(req,res) =>{
    const {nombre_artista, titulo_obra, url_image_obra} = req.body 
    const _idUsuario = (req.usuario.rows[0].id_usuario)
    try {
        //toda la data ya esta registrada en la api por lo tanto no se hace validacion de campos vacios
        const validarNombreArtista = await pool.query('select count(*) from artistas where nombre_artista = $1',[nombre_artista]);
        const validarNombreObra = await pool.query('select count(*) from obras where url_image_obra = $1',[url_image_obra]);

        if((validarNombreObra.rows[0].count) > 0) return res.status(500).json({ msg: 'Ya está en tu lista de favoritos'});

        if ((validarNombreArtista.rows[0].count) > 0) {
            const buscarIdArtista = await pool.query('select id_artista from artistas where nombre_artista = $1', [nombre_artista]);
            const _id = buscarIdArtista.rows[0].id_artista; 
            insertarObras(_id, _idUsuario, titulo_obra, url_image_obra, res);
        } 
        else{
            const consulta_id = await pool.query('insert into artistas (nombre_artista) values ($1) RETURNING id_artista', [nombre_artista]);
            let _id = (consulta_id.rows[0].id_artista);
            insertarObras(_id, _idUsuario,titulo_obra, url_image_obra, res);
        }
        
    } catch (error) {
        res.status(500).json({ msg: error.message }) 
    }
}

const listarFavoritos = async(req,res)=>{
    const _idUsuario = (req.usuario.rows[0].id_usuario)
    // const listaFavoritos = await pool.query(`select id_obra, titulo_obra, url_image_obra, a.nombre_artista from obras as o join usuarios u on o.id_usuario=u.id_usuario join artistas as a on o.id_artista=a.id_artista`)
    const listaFavoritos = await pool.query('select id_obra, titulo_obra, url_image_obra, a.nombre_artista from obras as o  join (select id_usuario from usuarios where id_usuario = $1) as u on o.id_usuario = u.id_usuario join artistas as a on o.id_artista = a.id_artista',[_idUsuario])
    if(listarFavoritos.rowCount === 0) return res.status(404).json({msg:'Tu lista de favoritos está vacia'})
    res.status(201).json(listaFavoritos.rows)
}

const eliminarListaFavoritos = async (id_obra,res,req)=>{
    const _idUsuario = (req.usuario.rows[0].id_usuario)
    await pool.query('delete from obras where id_obra=$1 and id_usuario =$2',[id_obra, _idUsuario]);
    res.status(201).json({ msg: 'Se eliminó de tu listado'})
}

export {insertarFavoritos, listarFavoritos, eliminarListaFavoritos}