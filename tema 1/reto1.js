const mysql = require ('mysql2/promise');
async function main (){
    try{
        let connection = await mysql.createConnection({
            host : "localhost",
            user: "root",
            password: "Calles123!",
            database: "dia1"
        })
        console.log("conexion correcta")
//         let sql = 
//         `ALTER TABLE direccion
//          ADD COLUMN PLANETA VARCHAR(60) NOT NULL`
// let [result] = await connection.query(sql)
// console.log("columna creada")
// console.log(result)
// let qSql = `ALTER TABLE direccion
//             DROP COLUMN PLANETA`
//  let [qResult]= await connection.query(qSql)
//  console.log("columna eliminada")
//  console.log(qResult)
// let qTable = `DROP TABLE direccion`
// let [qTableResult] = await connection.query(qTable)
// console.log("tabla eliminada")
// console.log(qTableResult)
// let uSql = 
// `UPDATE marks set mark = 0
// `
// let [uResult] = await connection.query(uSql)
// console.log("notas cambiadas a 0")
// console.log(uResult)
// let gSql = 
// `SELECT first_name, last_name FROM students
// `
// let [gResult] = await connection.query(gSql)
// console.log("nombre y apellido de todos los alumnos")
// console.log(gResult)

// let gTSql = 
// `SELECT * FROM teachers
// `
// let [gTResult] = await connection.query(gTSql)
// console.log("datos de profesores")
// console.log(gTResult)
// let dSql = 
// ` DELETE FROM marks where date < "2015-02-13"
// `
// let [dResult] = await connection.query(dSql)
// console.log("datos eliminados con exito")
// console.log(dResult)
let umSql = 
`UPDATE marks SET mark = 5 where mark < "5" 
`
let [uMResult] = await connection.query(umSql)
console.log("datos actualizados con exito")
console.log(uMResult)

    }
    catch(err)
    {
        console.log(err)
        await connection.end()}
}

main()


