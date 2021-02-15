import express from 'express';
import * as personaController from '../controllers/personas.controller';

const router = express.Router();

router.get('/', personaController.redirect);
router.get('/personas', personaController.getAllPersonas);
router.post('/personas', personaController.createPersona);
router.get('/personas/:id', personaController.findOnePersona);

export default router;
