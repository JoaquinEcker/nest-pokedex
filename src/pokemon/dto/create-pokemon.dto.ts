import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {
  // isInt, positivo, min: 1
  @IsInt()
  @IsPositive()
  @Min(1)
  no: number;

  // isString, minLength
  @IsString()
  @MinLength(1)
  name: string;
}
