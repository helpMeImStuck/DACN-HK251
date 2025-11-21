import * as mongoose from 'mongoose';

// Schema cho lịch sử test
const TestHistorySchema = new mongoose.Schema({
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  correctAnswers: {
    type: Number,
    required: true,
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
  timeSpent: {
    type: Number, // thời gian làm bài (giây)
    required: true,
  },
  answers: [{
    questionId: mongoose.Schema.Types.ObjectId,
    selectedAnswer: String,
    isCorrect: Boolean,
  }],
});

// Schema cho lịch sử học
const LearningHistorySchema = new mongoose.Schema({
  topicId: {
    type: String,
    required: true,
  },
  topicName: {
    type: String,
    required: true,
  },
  progress: {
    type: Number, // phần trăm hoàn thành
    default: 0,
    min: 0,
    max: 100,
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String, // ghi chú của học sinh
  },
});

// Schema chính cho User
export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Thông tin cá nhân
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String, // URL hoặc path của ảnh
    default: 'default-avatar.png',
  },
  dateOfBirth: {
    type: Date,
  },
  grade: {
    type: String, // lớp học
    default: '11',
  },
  // Lịch sử
  testHistory: [TestHistorySchema],
  learningHistory: [LearningHistorySchema],
  // Thông tin hệ thống
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastLoginAt: {
    type: Date,
  },
});

// Interface cho TypeScript
export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
  avatar?: string;
  dateOfBirth?: Date;
  grade?: string;
  testHistory: ITestHistory[];
  learningHistory: ILearningHistory[];
  role: 'student' | 'teacher' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export interface ITestHistory {
  exerciseId: mongoose.Types.ObjectId;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: Date;
  timeSpent: number;
  answers: {
    questionId: mongoose.Types.ObjectId;
    selectedAnswer: string;
    isCorrect: boolean;
  }[];
}

export interface ILearningHistory {
  topicId: string;
  topicName: string;
  progress: number;
  lastAccessedAt: Date;
  notes?: string;
}
