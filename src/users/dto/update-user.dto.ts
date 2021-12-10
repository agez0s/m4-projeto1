/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 150)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  userName: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  password: string;
}
