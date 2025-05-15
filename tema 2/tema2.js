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

// let mediaSql = 
// `
// SELECT AVG(mark) as mark_Average FROM marks where subject_id =1 GROUP BY subject_id   
// `
// let [mediaResult] = await connection.query(mediaSql)
// console.log(`la media de las notas de la asignatura 1 es:`)
// console.log(mediaResult[0].mark_Average)
// let filtroSql = 
// `SELECT student_id, mark, date from marks WHERE (student_id BETWEEN 1 AND 20) OR (mark > 8 AND date >= "2024-01-01" and date <= "2024-12-31") 
// `
// let [filtroResult] = await connection.query(filtroSql) 
// console.log("estudiantes con id ente 1 y 20 ó con notas superiores a 8 del año pasado")
// console.log(filtroResult)
// let lYASQL = 
// `SELECT m.subject_id, s.title, AVG(m.mark) AS average_mark
// FROM marks m
// INNER JOIN subjects s ON m.subject_id = s.subject_id
// WHERE m.date BETWEEN '2024-01-01' AND '2024-12-31'
// GROUP BY m.subject_id, s.title

// `
// let [lYAResult] = await connection.query(lYASQL)
// console.log("la media de las asignaturas por id:")
// console.log(lYAResult)

// let AAvSql = 
// `SELECT AVG(m.mark), s.student_id, s.first_name, COUNT (m.mark_id) AS number_of_marks from marks m
// INNER JOIN students s ON m.student_id = s.student_id
// WHERE date BETWEEN "2024-01-01" AND "2024-12-31"
// GROUP BY s.first_name, s.student_id
// `
// let [AAVResult] = await connection.query(AAvSql)
// console.log("nota media de alumnos")
// console.log(AAVResult)

let grupoSql = 
`       SELECT 
        s.subject_id, s.title AS nombre_asignatura, CONCAT(t.first_name, ' ', t.last_name) AS nombre_profesor,
        COUNT(st.student_id) AS total_alumnos
        FROM subjects s
        JOIN subject_teacher stc ON s.subject_id = stc.subject_id
        JOIN teachers t ON stc.teacher_id = t.teacher_id
        JOIN teams tm ON stc.group_id = tm.teams_id
        JOIN students st ON tm.teams_id = st.group_id
        GROUP BY s.subject_id, s.title, t.teacher_id, t.first_name, t.last_name
        ORDER BY s.subject_id
`
let [grupoResult] = await connection.query(grupoSql)
console.log("lista de grupo con profesor")
console.log(grupoResult)

    }
    catch(err)
    {
        console.log(err)
        await connection.end()}
}

main()