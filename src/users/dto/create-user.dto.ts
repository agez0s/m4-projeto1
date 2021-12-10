/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, Length } from "class-validator";


export class CreateUserDto {
  
  @IsString()
  @IsNotEmpty()
  @Length(4,150)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(4,20)
  userName: string;

  @IsString()
  @IsNotEmpty()
  @Length(8,20)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(8,20)
  passwordConfirm: string;
}
