import { NextFunction, Request, Response } from 'express';
import { NativeError, Types } from 'mongoose';
import { check, validationResult } from 'express-validator';
import Persona from '../models/persona.model';
import IPersona from '../interfaces/i.persona';

const createPersona = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
          throw error;
        }
        if (existingPersona) {
          res.status(200);
          throw new Error('A Persona with that name already exists.');
        }
        persona.save().then((result) => {
          return res.status(201).json({
            persona: result,
          });
        });
      }
    );
  } catch (error) {
    next(error);
  }
};

const getAllPersonas = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Persona.find((error, personas) => {
      if (error) {
        res.status(500);
        throw error;
      } else {
        return res.status(200).json({
          count: personas.length,
          results: personas,
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * TODO:
 * - Find by name
 * - Find by japaneseName
 * - Find Personas by arcana
 */
const findOnePersona = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(Types.ObjectId.isValid(req.params.id));
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
