const {Router} = require('express')
const router = Router()
const  piezasCtrl = require('../controller/piezas.controller')

router.get('/piezas', piezasCtrl.getPiezas)
router.post('/piezas', piezasCtrl.publicarPieza)
router.put('/piezas', piezasCtrl.actualizarPieza)
router.delete('/piezas', piezasCtrl.borrarPieza)
router.get('/prestamos', piezasCtrl.prestamos)
router.get('/colecciones', piezasCtrl.colecciones)

module.exports = router