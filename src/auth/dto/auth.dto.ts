/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CredentialsDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  userName: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  password: string;
}
