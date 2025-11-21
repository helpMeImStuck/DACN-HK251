import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ExercisesModule } from './exercises/exercises.module';
//import * as dotenv from 'dotenv';

//dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(
      //process.env.MONGO_URI || 'mongodb://localhost:27017/chemistry_learning_db',
      //'mongodb+srv://chemistry_app_db_user:SiscoPCHTpB3HucO@cluster0.6rb0dtg.mongodb.net/?appName=Cluster0'
      'mongodb://localhost:27017/chemistry_learning_db'
    ),
    UsersModule,
    ExercisesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
