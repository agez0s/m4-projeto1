/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, Length } from "class-validator";


export class UpdateFilmeDto {
  
  @IsString()
  @IsNotEmpty()
  @Length(1,150)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(4)
  year: string;
}
