import { IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  readonly name: string;
}
