import { Document } from 'mongoose';

export default interface IPersona extends Document {
  arcana: string;
  background: string;
  japaneseName: string;
  level: number;
  name: string;
}
