import {Router} from 'express'


//variables

import { ActualizarUsuarios, ConsularInfoUsuarios, ConsultarAdminPorCorreo, ConsultarAlumnosSemestre1, ConsultarAlumnosSemestre2, ConsultarAlumnosSemestre3, ConsultarAlumnosSemestre4, ConsultarAlumnosSemestre5, ConsultarAlumnosSemestre6, ConsultarAvisos, ConsultarCalisPorAlumno, ConsultarCalisPorCaliId, ConsultarInfoUsuarioId, ConsultarPerfilesDeEmparejamiento, ConsultarPerfilesDeEmparejamientoPorId, ConsultarPerfilesDeEmparejamientoPorMateria, ConsultarReportesSeguimientoEmocional, ConsultarReportesSeguimientoEmocionalPorAlumno, EliminarAlumno, EliminarAviso, EliminarNombre, EnviarFormulario, InscribirUsuarios, ModificarCalis, PruebaForm, SubirCalificaciones } from '../controllers/bridge.controllers.js'
import { CrearAvisos } from '../controllers/bridge.controllers.js'
import { AsignarGrupos } from '../controllers/bridge.controllers.js'

const router = Router()



//rutas de peticiones

router.post('/InscribirAlumnos',InscribirUsuarios)
router.post('/CrearRutas',CrearAvisos)
router.post('/AsignarGrupos',AsignarGrupos)
router.get('/ConsultarInfoUsuarios',ConsularInfoUsuarios)
router.get('/ConsultarInfoUsuarioId/:id',ConsultarInfoUsuarioId)
router.get('/ConsultarCalisPorAlumno/:id',ConsultarCalisPorAlumno) //docentes y administrativos Y ALUMNOS
router.get('/ConsultarAvisos',ConsultarAvisos)                     //docentes y administrativos Y ALUMNOS
router.patch('/ActualizarUsuarios/:id',ActualizarUsuarios)
router.delete('/EliminarUsuario/:id',EliminarNombre)
router.delete('/EliminarAviso/:id',EliminarAviso)
router.post('/SubirCalificaciones/:id',SubirCalificaciones)            //docentes
router.get('/ConsultarReportesSeguimientoEmocional',ConsultarReportesSeguimientoEmocional)                     //psicologo
router.get('S',ConsultarReportesSeguimientoEmocionalPorAlumno)  
router.get('/ConsultarCalisPorCaliId/:id',ConsultarCalisPorCaliId)
router.patch('/ModificarCalis/:id',ModificarCalis)    
router.patch('/EliminarAlumno/:id',EliminarAlumno)
router.get('/ConsultarAdminPorCorrer/:correo',ConsultarAdminPorCorreo) 

//CONSULTAR ALUMNOS POR SEMESTRE (RUTAS)
router.get('/ConsultarAlumnosSemestre1',ConsultarAlumnosSemestre1)
router.get('/ConsultarAlumnosSemestre2',ConsultarAlumnosSemestre2)
router.get('/ConsultarAlumnosSemestre3',ConsultarAlumnosSemestre3)
router.get('/ConsultarAlumnosSemestre4',ConsultarAlumnosSemestre4)
router.get('/ConsultarAlumnosSemestre5',ConsultarAlumnosSemestre5)
router.get('/ConsultarAlumnosSemestre6',ConsultarAlumnosSemestre6)


//ALUMNOS

router.get('/ConsultarPerfilesDeEmparejamiento',ConsultarPerfilesDeEmparejamiento)
router.get('/ConsultarPerfilesDeEmparejamientoPorId/:id',ConsultarPerfilesDeEmparejamientoPorId)
router.get('/ConsultarPerfilesDeEmparejamientoPorMateria/:id',ConsultarPerfilesDeEmparejamientoPorMateria)
router.post('/EnviarFormulario',EnviarFormulario)
router.post('/PruebaForm',PruebaForm)




export default router
