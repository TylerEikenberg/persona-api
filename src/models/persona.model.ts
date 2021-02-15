import mongoose, { Schema } from 'mongoose';
import IPersona from '../interfaces/i.persona';

const PersonaSchema: Schema = new Schema(
  {
    arcana: String,
    background: String,
    japaneseName: String,
    level: Number,
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPersona>('Persona', PersonaSchema);
