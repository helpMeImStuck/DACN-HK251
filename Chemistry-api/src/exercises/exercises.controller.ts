import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  @Get()
  findAll(
    @Query('chapter') chapter?: string,
    @Query('topic') topic?: string,
    @Query('type') type?: string,
  ) {
    if (chapter) {
      return this.exercisesService.findByChapter(chapter);
    }
    if (topic) {
      return this.exercisesService.findByTopic(topic);
    }
    if (type) {
      return this.exercisesService.findByType(type);
    }
    return this.exercisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exercisesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto) {
    return this.exercisesService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercisesService.remove(id);
  }

  @Post(':id/attempt')
  incrementAttemptCount(@Param('id') id: string) {
    return this.exercisesService.incrementAttemptCount(id);
  }

  @Post(':id/score')
  updateAverageScore(@Param('id') id: string, @Body('score') score: number) {
    return this.exercisesService.updateAverageScore(id, score);
  }
}
