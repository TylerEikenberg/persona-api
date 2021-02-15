import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Persona from '../models/persona.model';
import logger from '../config/logger';

const createPersona = (req: Request, res: Response, next: NextFunction) => {
  let { name, arcana, background, level, japaneseName } = req.body;

  const persona = new Persona({
    name,
    arcana,
    background,
    level,
    japaneseName,
  });

  return persona
    .save()
    .then((result) => {
      return res.status(201).json({
        persona: result,
      });
    })
    .catch((error) => {
      logger.error('SERVER', error.message, req.body);
      return res.status(500).json({
        error: error.message,
        status: 500,
      });
    });
};

const getAllPersonas = (_req: Request, res: Response, next: NextFunction) => {
  Persona.find()
    .exec()
    .then((results: string | any[]) => {
      return res.status(200).json({
        personas: results,
        count: results.length,
      });
    })
    .catch((error: { message: any }) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const findOnePersona = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /**
     * TODO:
     *  - Remove 'any' types
     *  - Handle this error: UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
     */
    const persona = await Persona.findById(req.params.id, (err: any) => {
      if (err) {
        res.status(404);
        return res.json({
          error: `Persona with ID '${req.params.id}' not found.`,
          status: res.statusCode,
        });
      }
    });
    if (!persona) {
      res.status(404);
      throw new Error(`Persona with ID '${req.params.id}' not found.`);
    } else {
      res.status(200);
      return res.json({
        persona,
      });
    }
  } catch (error) {
    console.log('poop');
    return res.json({ error: error.message, statusCode: res.statusCode });
  }
};

const redirect = (_req: Request, res: Response) => {
  res.redirect('/personas');
};

export { createPersona, findOnePersona, getAllPersonas, redirect };
