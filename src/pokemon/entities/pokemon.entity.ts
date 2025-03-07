import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// al extender de Document de mongoose, va a agregar nombres, metodos, para trabajar mas facil
// El decorador Schema es para indicar que es un esquema de base de datos
@Schema()
export class Pokemon extends Document {
  // id: string // Mongo me lo da
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
