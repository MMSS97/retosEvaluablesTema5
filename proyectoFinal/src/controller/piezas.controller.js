const pool = require('../database')

const getPiezas = async (req, res ) =>
{
    try {
        let sql
        if(req.query.id)
        {
            sql= "SELECT * FROM piezas WHERE pieza_id = " + req.query.id
            if(req.query.id = "[]"){
                res.send("no hay ninguna pieza con ese id")
            }
            let [result] = await pool.query(sql)
            res.send(result)
        } else {    sql =   "SELECT p.titulo, CONCAT(a.nombre,' ', a.apellido) AS autor, p.año, p.descripcion, CONCAT(c.nombre,  ' ' , c.tipo)  AS coleccion, m.nombre AS localizacion, pr.nombre as propietario FROM piezas AS p INNER JOIN autores AS a ON (p.autor_id = a.autores_id) INNER JOIN colecciones AS c ON (p.coleccion_id = c.coleccion_id) INNER JOIN museos AS m ON (p.ubicacion_actual = m.museo_id) INNER JOIN propietario AS pr ON (p.duenyo_id = pr.propietario_id) ORDER BY p.titulo ASC;";
        let [result] = await pool.query(sql)
            res.send(result)
        }
    }
    catch(err)
    {
        console.log(err)
    }
}

const publicarPieza = async (req ,res ) => {
    try {
        let sql = `INSERT INTO piezas (titulo, descripcion, año, autor_id, coleccion_id, duenyo_id, ubicacion_actual)` +
        "VALUES('"+req.body.titulo +"','"+ req.body.descripcion + "', "+ req.body.año + ", "+ req.body.autor_id+","+ req.body.coleccion_id+", "+ req.body.duenyo_id +", "+req.body.ubicacion_actual+")"
        let [result] = await pool.query(sql)
        if (result.insertId){
            res.send((String(result.insertId + " es el id de la pieza que acaba de crear")))
        }
        else console.log("no se pudo insertar la nueva pieza")
    }
    catch(err){
        console.log(err)
    }
}
const actualizarPieza = async (req, res ) => {
    try{
        let sql;
        if(req.query.id){
            sql = "UPDATE piezas SET titulo = '"+req.body.titulo+"', descripcion ='" + req.body.descripcion+"', año ="+req.body.año+", autor_id="+req.body.autor_id+",coleccion_id= "+ req.body.coleccion_id+ ", duenyo_id= " + req.body.duenyo_id + ", ubicacion_actual="+req.body.ubicacion_actual+" WHERE pieza_id="+req.query.id
            let [result] = await pool.query(sql)
            res.send(String(result.affectedRows)+ " pieza modificada")
        } else {
            res.send("no se pudo actualizar la pieza")
        }
    } catch(res){
        console.log(res)
    }
}

const borrarPieza = async (req, res ) =>{
    try {
        let sql 
        if(req.query.id){
            sql = "DELETE FROM piezas WHERE pieza_id ="+ req.query.id
            let [result] = await pool.query(sql)
            res.send(String(result.affectedRows)+ "pieza borrada")
        } else {res.send("id introducido no valido")}
    }catch (err){
        console.log(err)
    }
}

const prestamos = async (req, res) =>{
    try{
        let sql = `SELECT p.nombre, p.apellidos, pr.inicio, pr.fin FROM prestamos AS pr 
        JOIN piezas AS pi ON pr.pieza_id = pi.pieza_id 
        JOIN propietario AS p ON pi.pieza_id = p.propietario_id`
        let [result] = await pool.query(sql)
        res.send(result)
    }catch (err){
        console.log(err)
    }

}

const colecciones = async (req, res ) =>
{
    try{
        if(req.query.tipo){
        let sql = `SELECT co.nombre, p.titulo FROM colecciones as co
        JOIN  piezas as p ON co.coleccion_id = p.coleccion_id
        WHERE tipo =` + req.query.tipo
        let [result] = await pool.query(sql)
        res.send(result)
    }else {res.send('no se introdujo un numero para ver el tipo. 1) permanente, 2)almacenada,3)itinerante')
    }
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {getPiezas, publicarPieza, actualizarPieza, borrarPieza, prestamos, colecciones}