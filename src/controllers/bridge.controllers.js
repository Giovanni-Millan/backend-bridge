import { pool } from "../db/db.js";

//?ADMINISTRADOR
//INSCRIBIR USUARIOS
export const InscribirUsuarios= async(req,res) =>{

    try {
        const {nombre,apellido_paterno,apellido_materno,fecha_nacimiento,correo,contraseña,telefono,direccion,semestre}=req.body;
    
        const [rows] = await pool.query('INSERT INTO Alumnos (id_alumno, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, correo, contraseña, telefono, direccion, semestre) VALUES (id_alumno,?,?,?,?,?,?,?,?,?)',[nombre,apellido_paterno,apellido_materno,fecha_nacimiento,correo,contraseña,telefono,direccion,semestre]) 
        console.log(req.body)
        res.send({
            id_alumno:rows.insertId,
            nombre,
            apellido_paterno,
            apellido_materno,
            fecha_nacimiento,
            correo,
            contraseña,
            telefono,
            direccion,
            semestre
        })
    } catch (error) {
        console.log(error)        
    }   
    
    
}

//CREAR AVISOS
export const CrearAvisos= async(req,res) =>{
    try {
        const {titulo,descripcion}=req.body;
    
        const [rows] = await pool.query('INSERT INTO Avisos(titulo,descripcion) VALUES (?,?);',[titulo,descripcion])
        console.log(req.body)
        res.send({
            id_aviso:rows.insertId,
            titulo,
            descripcion
        }) 
    } catch (error) {
        console.log(error)
    }
}

//ASIGNAR GRUPOS
export const AsignarGrupos= async(req,res) =>{
    try {
        const {claveGrupo,id_alumno}=req.body;
    
        const [rows] = await pool.query('INSERT INTO Grupos (clave_grupo,id_alumno) VALUES (?,?)',[claveGrupo,id_alumno])
        console.log(req.body)
        res.send({
            id_grupo:rows.insertId,
            claveGrupo,
            id_alumno
        }) 
    } catch (error) {
        console.log(error)
    }
}

//CONSULTAR INFORMACION DE USUARIOS
export const ConsularInfoUsuarios = async(req,res)=>{

    try {

        const [rows] = await pool.query('select * from Alumnos')
        res.json(rows);

    } catch (error) {
        console.log(error)
        
    }
}

//CONSULTAR INFORMACION DE USUARIOS POR ID

export const ConsultarInfoUsuarioId = async(req,res)=>{
	//porbar el id del URL
	console.log(req.params.id);
	
	const [rows] = await pool.query('select * from Alumnos where id_alumno=?',[req.params.id])
	console.log(rows) //prueba de la consulta en la consola
	
	res.json(rows[0]) // prueba en vista
	
	if(rows.length<=0)return res.status(404).json({
		message: "note not found"
	});
}

//CONSULTAR CALIFICACIONES
export const ConsultarCalisPorAlumno = async(req,res)=>{
	//porbar el id del URL
    try {
        console.log(req.params.id);
        
        const [rows] = await pool.query('select C.id_calificacion, M.nombre_materia, C.parcial_1, C.parcial_2 , C.parcial_3,  ROUND((C.parcial_1 + C.parcial_2 + C.parcial_3) / 3) AS Promedio_Calificaciones  from alumnos A inner join calificaciones C on A.id_alumno=C.id_alumno join materias M on M.id_materia=C.id_materia where A.id_alumno=?;',[req.params.id])
        console.log(rows) //prueba de la consulta en la consola
        
        res.json(rows) // prueba en vista
        
        if(rows.length<=0)return res.status(404).json({
            message: "note not found"
        });
    } catch (error) { 
        console.log(error)
    }
}

//CONSULTAR CALIFICACIONES POR ID
export const ConsultarCalisPorCaliId = async(req,res)=>{
	//porbar el id del URL
    try {

        const id=req.params.id
        console.log(req.params.id);
        
        const [rows] = await pool.query('select * from calificaciones where id_calificacion=?',[id])
        console.log(rows) //prueba de la consulta en la consola
        
        res.json(rows) // prueba en vista
        
        if(rows.length<=0)return res.status(404).json({
            message: "note not found"
        });
    } catch (error) { 
        console.log(error)
    }
}

//CONSULTAR USUARIO ADMIN POR CORREO
export const ConsultarAdminPorCorreo = async(req,res)=>{
//porbar el id del URL
    try {

        const correo=req.params.correo
        console.log(req.params.correo);
        
        const [rows] = await pool.query('select * from administrativos where correo=?',[correo])
        console.log(rows) //prueba de la consulta en la consola
        
        res.json(rows) // prueba en vista
        
        if(rows.length<=0)return res.status(404).json({
            message: "note not found"
        });
    } catch (error) { 
        console.log(error)
    }
}

//CONSULTAR AVISOS
export const ConsultarAvisos = async(req,res)=>{
	
    try {

        const [rows] = await pool.query('select * from Avisos')
        res.json(rows);

    } catch (error) {
        console.log(error)
        
    }
}

//IMPRIMIR BOLETAS

//ACTUALIZAR USUARIOS
export const ActualizarUsuarios=async (req,res)=>{   
    try {
        const id_alumno=req.params.id;
        console.log(id_alumno)
        const {nombre,apellido_paterno,apellido_materno,fecha_nacimiento,correo,contraseña,telefono,direccion,semestre}=req.body;
        const [result]=await pool.query('UPDATE Alumnos SET nombre= IFNULL(?,nombre), apellido_paterno=IFNULL(?,apellido_paterno), apellido_materno=IFNULL(?,apellido_materno), fecha_nacimiento=IFNULL(?,fecha_nacimiento), correo=IFNULL(?,correo), contraseña=IFNULL(?,contraseña), telefono=IFNULL(?,telefono), direccion=IFNULL(?,direccion), semestre=IFNULL(?,semestre) WHERE id_alumno=?',[nombre,apellido_paterno,apellido_materno,fecha_nacimiento,correo,contraseña,telefono,direccion,semestre,id_alumno]) 
        
        res.json("recibido")
        console.log(result)
        if(result.affectedRows===0)return res.status(404).json({
            message:"name not found"
        }) 
    } catch (error) {
        console.log(error)   
    } 
}    

export const ModificarCalis=async (req,res)=>{   
    try {
        const id_calificacion=req.params.id;
        console.log(id_calificacion)
        const {parcial_1,parcial_2,parcial_3}=req.body;
        const [result]=await pool.query('UPDATE calificaciones SET parcial_1=IFNULL(?,parcial_1), parcial_2=IFNULL(?,parcial_2), parcial_3=IFNULL(?,parcial_3) where id_calificacion=?',[parcial_1,parcial_2,parcial_3,id_calificacion]) 
        
        res.json("recibido")
        console.log(result)
        if(result.affectedRows===0)return res.status(404).json({
            message:"name not found"
        }) 
    } catch (error) {
        console.log(error)   
    } 
}    

//ELIMINAR USUARIOS
export const EliminarNombre=async(req,res)=>{
    try {
        const [result]=await pool.query('DELETE FROM Alumnos WHERE id_alumno=?',[req.params.id])
        
        console.log(result)
        if(result.affectedRows <=0) return res.status(404).json({
            message:"name not found"
        })
    
        res.send('nombre eliminado')
        res.status(204)
    } catch (error) {
        console.log(error)
    }
}


//ELIMINAR AVISOS
export const EliminarAviso=async(req,res)=>{
    try {
        const [result]=await pool.query('DELETE FROM Avisos WHERE id_aviso=?',[req.params.id])
        
        console.log(result)
        if(result.affectedRows <=0) return res.status(404).json({
            message:"name not found"
        })
    
        res.send('aviso eliminado')
        res.status(204)
    } catch (error) {
        console.log(error)
    }
}

export const EliminarAlumno=async (req,res)=>{   
    try {
        const id_alumno=req.params.id;
        
        const [result]=await pool.query('UPDATE Alumnos SET semestre=0 where id_alumno=?',[id_alumno]) 
        
        res.json("Alumno Eliminado")
        console.log(result)
        if(result.affectedRows===0)return res.status(404).json({
            message:"name not found"
        }) 
    } catch (error) {
        console.log(error)   
    } 
}  

//! ------------------------------------------------------------------------------------------------------------------------------------------------------------
//CONSULTAR ALUMNOS POR SEMESTRE

export const ConsultarAlumnosSemestre1  = async(req,res)=>{
	
    try {

        const [rows] = await pool.query('select * from alumnos where semestre=1;')
        res.json(rows);

    } catch (error) {
        console.log(error)
        
    }
}

export const ConsultarAlumnosSemestre2  = async(req,res)=>{
	
    try {

        const [rows] = await pool.query('select * from alumnos where semestre=2;')
        res.json(rows);

    } catch (error) {
        console.log(error)
        
    }
}

export const ConsultarAlumnosSemestre3  = async(req,res)=>{
	
    try {

        const [rows] = await pool.query('select * from alumnos where semestre=3;')
        res.json(rows);

    } catch (error) {
        console.log(error)
        
    }
}

export const ConsultarAlumnosSemestre4  = async(req,res)=>{
	
    try {

        const [rows] = await pool.query('select * from alumnos where semestre=4;')
        res.json(rows);

    } catch (error) {
        console.log(error)
        
    }
}

export const ConsultarAlumnosSemestre5  = async(req,res)=>{
	
    try {

        const [rows] = await pool.query('select * from alumnos where semestre=5;')
        res.json(rows);

    } catch (error) {
        console.log(error)
        
    }
}

export const ConsultarAlumnosSemestre6  = async(req,res)=>{
	
    try {

        const [rows] = await pool.query('select * from alumnos where semestre=6;')
        res.json(rows);

    } catch (error) {
        console.log(error)
        
    }
}


//*DOCENTES
export const SubirCalificaciones= async(req,res) =>{
    try {

        const id=req.params.id;
        console.log(id);

        const {id_materia,parcial_1,parcial_2,parcial_3}=req.body;
    
        const [rows] = await pool.query('INSERT INTO Calificaciones (id_alumno, id_materia, parcial_1, parcial_2, parcial_3) VALUES (?, ?, ?, ?, ?);',[id,id_materia,parcial_1,parcial_2,parcial_3])
        console.log(req.body)
        res.send({
            id_calificacion:rows.insertId,
            id,
            id_materia,
            parcial_1,
            parcial_2,
            parcial_3
        }) 
    } catch (error) {
        console.log(error)
    }
}


//PSICOLOGO

export const ConsultarReportesSeguimientoEmocional = async(req,res)=>{
	
    try {

        const [rows] = await pool.query('SELECT A.id_alumno,A.nombre,A.apellido_paterno,A.apellido_materno,A.semestre, SA.fecha_hora, reactivo_1, reactivo_2, reactivo_3, reactivo_4, reactivo_5,reactivo_6, reactivo_7, reactivo_8, reactivo_9, reactivo_10,reactivo_11, reactivo_12, reactivo_13, reactivo_14, reactivo_15,reactivo_16, reactivo_17, reactivo_18, reactivo_19, reactivo_20, reactivo_21, reactivo_22, reactivo_23, reactivo_24 FROM Seguimiento_Academico SA INNER JOIN Alumnos A  on A.id_alumno=SA.id_alumno;')
        res.json(rows);

    } catch (error) {
        console.log(error)
        
    }
}

export const ConsultarReportesSeguimientoEmocionalPorAlumno = async(req,res)=>{
	//porbar el id del URL
    try {
        console.log(req.params.id);
        
        const [rows] = await pool.query('SELECT A.nombre, A.apellido_paterno, A.apellido_materno, SA.fecha_hora, reactivo_1, reactivo_2, reactivo_3, reactivo_4, reactivo_5,reactivo_6, reactivo_7, reactivo_8, reactivo_9, reactivo_10,reactivo_11, reactivo_12, reactivo_13, reactivo_14, reactivo_15,reactivo_16, reactivo_17, reactivo_18, reactivo_19, reactivo_20, reactivo_21, reactivo_22, reactivo_23, reactivo_24 FROM Seguimiento_Academico SA INNER JOIN Alumnos A  on A.id_alumno=SA.id_alumno where a.id_alumno=? ',[req.params.id])
        console.log(rows) //prueba de la consulta en la consola
        
        res.json(rows[0]) // prueba en vista
        
        if(rows.length<=0)return res.status(404).json({
            message: "note not found"
        });
    } catch (error) { 
        console.log(error)
    }
}



//!ALUMNOS

//CONSULTAR PERFILES DE EMPAREJAMIENTO
export const ConsultarPerfilesDeEmparejamiento = async(req,res)=>{
	
    try {

        const [rows] = await pool.query('select A.id_alumno, nombre,apellido_paterno,apellido_materno,semestre,nombre_materia from Alumnos A inner join Perfiles_Emparejamiento PE on A.id_alumno=PE.id_alumno inner join Materias M on PE.id_materia=M.id_materia;')
        res.json(rows);

    } catch (error) {
        console.log(error)
        
    }
}



//CONSULTAR PERFILES DE EMPAREJAMIENTO POR ID
export const ConsultarPerfilesDeEmparejamientoPorId = async(req,res)=>{
	//porbar el id del URL
    try {
        console.log(req.params.id);
        
        const [rows] = await pool.query('select nombre,apellido_paterno,apellido_materno,semestre,nombre_materia from Alumnos A inner join Perfiles_Emparejamiento PE on A.id_alumno=PE.id_alumno inner join Materias M on PE.id_materia=M.id_materia where A.id_alumno=?;',[req.params.id])
        console.log(rows) //prueba de la consulta en la consola
        
        res.json(rows[0]) // prueba en vista
        
        if(rows.length<=0)return res.status(404).json({
            message: "note not found"
        });
    } catch (error) { 
        console.log(error)
    }
}

//CONSULTAR PERFILES DE EMPAREJAMIENTO POR MATERIA
export const ConsultarPerfilesDeEmparejamientoPorMateria = async(req,res)=>{
	try {
        console.log(req.params.id);
        
        const [rows] = await pool.query('select nombre,apellido_paterno,apellido_materno,semestre,nombre_materia from Alumnos A inner join Perfiles_Emparejamiento PE on A.id_alumno=PE.id_alumno inner join Materias M on PE.id_materia=M.id_materia where M.id_materia=?;',[req.params.id])
        console.log(rows) //prueba de la consulta en la consola
        
        res.json(rows[0]) // prueba en vista
        
        if(rows.length<=0)return res.status(404).json({
            message: "note not found"
        });
    } catch (error) { 
        console.log(error)
    }
   
}


//ENVIAR FORMULARIO DE SEGUIMIENTO EMOCIONAL

//*este se puede enviar siempre y cuandpo exista un alumno
export const EnviarFormulario= async(req,res) =>{

    try {
        const {id_alumno, 
            reactivo_1, reactivo_2, reactivo_3, reactivo_4, reactivo_5, 
            reactivo_6, reactivo_7, reactivo_8, reactivo_9, reactivo_10, 
            reactivo_11, reactivo_12, reactivo_13, reactivo_14, reactivo_15, 
            reactivo_16, reactivo_17, reactivo_18, reactivo_19, reactivo_20, 
            reactivo_21, reactivo_22, reactivo_23, reactivo_24, 
            fecha_hora}=req.body;
    
        const [rows] = await pool.query('INSERT INTO Seguimiento_Academico(id_alumno,reactivo_1, reactivo_2, reactivo_3, reactivo_4, reactivo_5, reactivo_6, reactivo_7, reactivo_8, reactivo_9, reactivo_10,reactivo_11, reactivo_12, reactivo_13, reactivo_14, reactivo_15, reactivo_16, reactivo_17, reactivo_18, reactivo_19, reactivo_20, reactivo_21, reactivo_22, reactivo_23, reactivo_24, fecha_hora ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW());',[id_alumno,reactivo_1, reactivo_2, reactivo_3, reactivo_4, reactivo_5,reactivo_6, reactivo_7, reactivo_8, reactivo_9, reactivo_10, reactivo_11, reactivo_12, reactivo_13, reactivo_14, reactivo_15,reactivo_16, reactivo_17, reactivo_18, reactivo_19, reactivo_20,reactivo_21, reactivo_22, reactivo_23, reactivo_24,fecha_hora])
        console.log(req.body)
        res.send({
            id_seguimiento:rows.insertId,
            id_alumno, 
            reactivo_1, reactivo_2, reactivo_3, reactivo_4, reactivo_5, 
            reactivo_6, reactivo_7, reactivo_8, reactivo_9, reactivo_10, 
            reactivo_11, reactivo_12, reactivo_13, reactivo_14, reactivo_15, 
            reactivo_16, reactivo_17, reactivo_18, reactivo_19, reactivo_20, 
            reactivo_21, reactivo_22, reactivo_23, reactivo_24, 
            fecha_hora
        }) 
    } catch (error) {
        console.log(error)
    }
}

export const PruebaForm= async(req,res) =>{

    try {
        const {pregunta1,pregunta2,pregunta3}=req.body;
    
        const [rows] = await pool.query('INSERT INTO form(pregunta1,pregunta2,pregunta3) VALUES (?,?,?);',[pregunta1,pregunta2,pregunta3])
        console.log(req.body)
        res.send({
            pregunta1,
            pregunta2,
            pregunta3
            
        }) 
    } catch (error) {
        console.log(error)
    }
}



