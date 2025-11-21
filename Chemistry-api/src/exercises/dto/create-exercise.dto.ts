import { IsNotEmpty, IsString, IsOptional, IsNumber, IsArray, IsBoolean, IsEnum } from 'class-validator';

class AnswerDto {
  @IsNotEmpty()
  @IsString()
  optionLabel: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsBoolean()
  isCorrect: boolean;
}

class QuestionDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsEnum(['multiple-choice', 'true-false', 'fill-blank', 'essay'])
  questionType: string;

  @IsArray()
  answers: AnswerDto[];

  @IsNotEmpty()
  @IsString()
  correctAnswer: string;

  @IsOptional()
  @IsString()
  explanation?: string;

  @IsOptional()
  @IsEnum(['easy', 'medium', 'hard'])
  difficulty?: string;

  @IsOptional()
  @IsNumber()
  points?: number;

  @IsOptional()
  @IsString()
  image?: string;
}

export class CreateExerciseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  grade?: string;

  @IsNotEmpty()
  @IsString()
  chapter: string;

  @IsNotEmpty()
  @IsString()
  topic: string;

  @IsOptional()
  @IsNumber()
  lessonNumber?: number;

  @IsEnum([
    'ly-thuyet',
    'bai-tap-nhan-biet',
    'bai-tap-thong-hieu',
    'bai-tap-van-dung',
    'bai-tap-tong-hop',
    'de-kiem-tra',
    'on-tap',
  ])
  exerciseType: string;

  @IsArray()
  questions: QuestionDto[];

  @IsOptional()
  @IsNumber()
  timeLimit?: number;

  @IsOptional()
  @IsNumber()
  passingScore?: number;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
