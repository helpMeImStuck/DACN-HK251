import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IExercise } from './exercises.model';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectModel('Exercise') private readonly exerciseModel: Model<IExercise>,
  ) {}

  async create(createExerciseDto: CreateExerciseDto): Promise<IExercise> {
    const totalQuestions = createExerciseDto.questions.length;
    const totalPoints = createExerciseDto.questions.reduce(
      (sum, q) => sum + (q.points || 1),
      0,
    );

    const newExercise = new this.exerciseModel({
      ...createExerciseDto,
      totalQuestions,
      totalPoints,
    });
    return await newExercise.save();
  }

  async findAll(): Promise<IExercise[]> {
    return await this.exerciseModel.find().exec();
  }

  async findByChapter(chapter: string): Promise<IExercise[]> {
    return await this.exerciseModel.find({ chapter }).exec();
  }

  async findByTopic(topic: string): Promise<IExercise[]> {
    return await this.exerciseModel.find({ topic }).exec();
  }

  async findByType(exerciseType: string): Promise<IExercise[]> {
    return await this.exerciseModel.find({ exerciseType }).exec();
  }

  async findOne(id: string): Promise<IExercise> {
    const exercise = await this.exerciseModel.findById(id).exec();
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }
    return exercise;
  }

  async update(id: string, updateExerciseDto: UpdateExerciseDto): Promise<IExercise> {
    const updateData: any = { ...updateExerciseDto, updatedAt: new Date() };
    
    if (updateExerciseDto.questions) {
      updateData.totalQuestions = updateExerciseDto.questions.length;
      updateData.totalPoints = updateExerciseDto.questions.reduce(
        (sum, q) => sum + (q.points || 1),
        0,
      );
    }

    const updatedExercise = await this.exerciseModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    
    if (!updatedExercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }
    return updatedExercise;
  }

  async remove(id: string): Promise<void> {
    const result = await this.exerciseModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }
  }

  async incrementAttemptCount(id: string): Promise<IExercise> {
    const exercise = await this.exerciseModel.findById(id).exec();
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }
    exercise.attemptCount += 1;
    return await exercise.save();
  }

  async updateAverageScore(id: string, newScore: number): Promise<IExercise> {
    const exercise = await this.exerciseModel.findById(id).exec();
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }
    
    const totalAttempts = exercise.attemptCount;
    exercise.averageScore = 
      (exercise.averageScore * (totalAttempts - 1) + newScore) / totalAttempts;
    
    return await exercise.save();
  }
}
