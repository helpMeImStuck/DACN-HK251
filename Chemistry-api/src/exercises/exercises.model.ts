import * as mongoose from 'mongoose';

// Schema cho câu trả lời
const AnswerSchema = new mongoose.Schema({
  optionLabel: {
    type: String, // A, B, C, D
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
});

// Schema cho câu hỏi
const QuestionSchema = new mongoose.Schema({
  content: {
    type: String, // nội dung câu hỏi
    required: true,
  },
  questionType: {
    type: String,
    enum: ['multiple-choice', 'true-false', 'fill-blank', 'essay'],
    default: 'multiple-choice',
  },
  answers: [AnswerSchema],
  correctAnswer: {
    type: String, // đáp án đúng
    required: true,
  },
  explanation: {
    type: String, // giải thích đáp án
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium',
  },
  points: {
    type: Number, // điểm cho câu hỏi
    default: 1,
  },
  image: {
    type: String, // URL hình ảnh minh họa
  },
});

// Schema cho bài tập Hóa 11 Chương 1
export const ExerciseSchema = new mongoose.Schema({
  // Thông tin chung
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  // Phân loại
  subject: {
    type: String,
    default: 'Hóa học',
  },
  grade: {
    type: String,
    default: '11',
  },
  chapter: {
    type: String,
    required: true,
    default: 'Chương 1', // Chương 1: Sự điện li
  },
  topic: {
    type: String,
    required: true,
    // Ví dụ: "Axit, bazơ và muối", "Phản ứng trao đổi ion trong dung dịch chất điện li"
  },
  lessonNumber: {
    type: Number, // Bài số mấy
  },
  // Dạng bài tập
  exerciseType: {
    type: String,
    enum: [
      'ly-thuyet', // Lý thuyết
      'bai-tap-nhan-biet', // Bài tập nhận biết
      'bai-tap-thong-hieu', // Bài tập thông hiểu
      'bai-tap-van-dung', // Bài tập vận dụng
      'bai-tap-tong-hop', // Bài tập tổng hợp
      'de-kiem-tra', // Đề kiểm tra
      'on-tap', // Ôn tập
    ],
    default: 'bai-tap-thong-hieu',
  },
  // Câu hỏi và đáp án
  questions: [QuestionSchema],
  totalQuestions: {
    type: Number,
    default: 0,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
  // Thời gian và cài đặt
  timeLimit: {
    type: Number, // thời gian làm bài (phút)
    default: 30,
  },
  passingScore: {
    type: Number, // điểm đạt yêu cầu
    default: 5,
  },
  // Thống kê
  attemptCount: {
    type: Number, // số lượt làm
    default: 0,
  },
  averageScore: {
    type: Number, // điểm trung bình
    default: 0,
  },
  // Trạng thái
  isPublished: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Interface cho TypeScript
export interface IExercise extends mongoose.Document {
  title: string;
  description?: string;
  subject: string;
  grade: string;
  chapter: string;
  topic: string;
  lessonNumber?: number;
  exerciseType: string;
  questions: IQuestion[];
  totalQuestions: number;
  totalPoints: number;
  timeLimit: number;
  passingScore: number;
  attemptCount: number;
  averageScore: number;
  isPublished: boolean;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuestion {
  content: string;
  questionType: 'multiple-choice' | 'true-false' | 'fill-blank' | 'essay';
  answers: IAnswer[];
  correctAnswer: string;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  image?: string;
}

export interface IAnswer {
  optionLabel: string;
  content: string;
  isCorrect: boolean;
}
