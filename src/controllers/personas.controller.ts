import { NextFunction, Request, Response } from 'express';
import { NativeError, Types } from 'mongoose';
import { check, validationResult } from 'express-validator';
import Persona from '../models/persona.model';
import IPersona from '../interfaces/i.persona';
import logger from '../config/logger';

const createPersona = async (req: Request, res: Response) => {
  try {
    await check('name', 'Name cannot be blank.').not().isEmpty().run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      errors.throw();
    }

    const { name, arcana, background, level, japaneseName } = req.body;
    const persona = new Persona({
      name,
      arcana,
      background,
      level,
      japaneseName,
    });

    await Persona.findOne(
      { name },
      (error: NativeError, existingPersona: IPersona) => {
        if (error) {
          logger.error('SERVER', error.message, req.body);
          throw error;
        }
        if (existingPersona) {
          res.status(200);
          throw new Error('A Persona with that name already exists.');
        }
        persona.save().then((result) => {
          logger.info('SERVER', 'Persona Created', req.body);
          return res.status(201).json({
            persona: result,
          });
        });
      }
    );
  } catch (error) {
    return res.json({ error, statusCode: res.statusCode });
  }
};

const getAllPersonas = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  await Persona.find((error, personas) => {
    if (error) {
      return res.status(500).json({
        message: error.message,
        error,
      });
    } else {
      return res.status(200).json({
        personas,
        count: personas.length,
      });
    }
  });
};

/**
 * TODO:
 * - Find by name
 * - Find by japaneseName
 * - Find Personas by arcana
 * - Refactor error handling in other functions
 */
const findOnePersona = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Persona.findById(
      Types.ObjectId(req.params.id),
      (error: Error, persona: IPersona) => {
        if (error) {
          throw error;
        } else if (!persona) {
          res.status(404).send(`Persona with ID '${req.params.id}' not found.`);
        } else {
          res.status(200).json({ persona });
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

const redirect = (_req: Request, res: Response) => {
  res.redirect('/personas');
};

export { createPersona, findOnePersona, getAllPersonas, redirect };
