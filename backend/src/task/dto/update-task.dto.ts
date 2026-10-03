import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsIn(['pending', 'in-progress', 'completed'])
  status: string;

  @IsString()
  @IsIn(['low', 'medium', 'high'])
  priority: string;
}