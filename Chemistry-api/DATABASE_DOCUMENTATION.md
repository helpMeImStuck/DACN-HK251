# Hệ thống Học tập Hóa học 11 - API Documentation

## Cấu trúc Database

Hệ thống sử dụng MongoDB với 2 collections chính:

### 1. Users Collection
Chứa thông tin người dùng, lịch sử học tập và làm bài tập.

**Schema:**
- `username`: Tên đăng nhập (unique)
- `email`: Email (unique)
- `password`: Mật khẩu (đã mã hóa)
- `fullName`: Họ và tên
- `phoneNumber`: Số điện thoại
- `avatar`: URL ảnh đại diện
- `dateOfBirth`: Ngày sinh
- `grade`: Lớp học (mặc định: "11")
- `testHistory[]`: Lịch sử làm bài test
  - `exerciseId`: ID bài tập
  - `score`: Điểm số
  - `totalQuestions`: Tổng số câu hỏi
  - `correctAnswers`: Số câu trả lời đúng
  - `completedAt`: Thời gian hoàn thành
  - `timeSpent`: Thời gian làm bài (giây)
  - `answers[]`: Chi tiết các câu trả lời
- `learningHistory[]`: Lịch sử học tập
  - `topicId`: ID chủ đề
  - `topicName`: Tên chủ đề
  - `progress`: % hoàn thành (0-100)
  - `lastAccessedAt`: Lần truy cập cuối
  - `notes`: Ghi chú của học sinh
- `role`: Vai trò (student/teacher/admin)
- `isActive`: Trạng thái hoạt động
- `createdAt`: Ngày tạo
- `updatedAt`: Ngày cập nhật
- `lastLoginAt`: Lần đăng nhập cuối

### 2. Exercises Collection
Chứa các bài tập Hóa học 11 - Chương 1.

**Schema:**
- `title`: Tiêu đề bài tập
- `description`: Mô tả
- `subject`: Môn học (Hóa học)
- `grade`: Khối lớp (11)
- `chapter`: Chương (Chương 1)
- `topic`: Chủ đề cụ thể
- `lessonNumber`: Số thứ tự bài học
- `exerciseType`: Dạng bài tập
  - `ly-thuyet`: Lý thuyết
  - `bai-tap-nhan-biet`: Nhận biết
  - `bai-tap-thong-hieu`: Thông hiểu
  - `bai-tap-van-dung`: Vận dụng
  - `bai-tap-tong-hop`: Tổng hợp
  - `de-kiem-tra`: Đề kiểm tra
  - `on-tap`: Ôn tập
- `questions[]`: Danh sách câu hỏi
  - `content`: Nội dung câu hỏi
  - `questionType`: Loại câu hỏi (multiple-choice/true-false/fill-blank/essay)
  - `answers[]`: Các đáp án
    - `optionLabel`: Nhãn (A, B, C, D)
    - `content`: Nội dung đáp án
    - `isCorrect`: Đúng/Sai
  - `correctAnswer`: Đáp án đúng
  - `explanation`: Giải thích
  - `difficulty`: Độ khó (easy/medium/hard)
  - `points`: Điểm số
  - `image`: Hình ảnh minh họa
- `totalQuestions`: Tổng số câu hỏi
- `totalPoints`: Tổng điểm
- `timeLimit`: Thời gian làm bài (phút)
- `passingScore`: Điểm đạt yêu cầu
- `attemptCount`: Số lượt làm
- `averageScore`: Điểm trung bình
- `isPublished`: Trạng thái xuất bản
- `createdBy`: Người tạo
- `createdAt`: Ngày tạo
- `updatedAt`: Ngày cập nhật

## API Endpoints

### Users API

#### 1. Tạo user mới
```
POST /users
Body: {
  "username": "student01",
  "email": "student01@example.com",
  "password": "password123",
  "fullName": "Nguyễn Văn A",
  "phoneNumber": "0123456789",
  "grade": "11"
}
```

#### 2. Lấy danh sách users
```
GET /users
```

#### 3. Lấy thông tin một user
```
GET /users/:id
```

#### 4. Cập nhật thông tin user
```
PATCH /users/:id
Body: {
  "fullName": "Nguyễn Văn B",
  "avatar": "avatar-url.jpg"
}
```

#### 5. Xóa user
```
DELETE /users/:id
```

#### 6. Thêm lịch sử test
```
POST /users/:id/test-history
Body: {
  "exerciseId": "exercise_id",
  "score": 8.5,
  "totalQuestions": 10,
  "correctAnswers": 8,
  "timeSpent": 600,
  "answers": [
    {
      "questionId": "question_id",
      "selectedAnswer": "A",
      "isCorrect": true
    }
  ]
}
```

#### 7. Cập nhật lịch sử học
```
POST /users/:id/learning-history
Body: {
  "topicId": "topic_1",
  "topicName": "Chất điện li",
  "progress": 75,
  "notes": "Đã học xong phần lý thuyết"
}
```

### Exercises API

#### 1. Tạo bài tập mới
```
POST /exercises
Body: {
  "title": "Bài tập về sự điện li",
  "chapter": "Chương 1",
  "topic": "Chất điện li - chất không điện li",
  "exerciseType": "bai-tap-nhan-biet",
  "timeLimit": 20,
  "questions": [
    {
      "content": "Chất nào sau đây là chất điện li?",
      "questionType": "multiple-choice",
      "answers": [
        { "optionLabel": "A", "content": "NaCl", "isCorrect": true },
        { "optionLabel": "B", "content": "C6H12O6", "isCorrect": false }
      ],
      "correctAnswer": "A",
      "explanation": "NaCl là muối tan",
      "difficulty": "easy",
      "points": 1
    }
  ]
}
```

#### 2. Lấy danh sách bài tập
```
GET /exercises
GET /exercises?chapter=Chương 1
GET /exercises?topic=Chất điện li
GET /exercises?type=bai-tap-nhan-biet
```

#### 3. Lấy chi tiết một bài tập
```
GET /exercises/:id
```

#### 4. Cập nhật bài tập
```
PATCH /exercises/:id
Body: { ... }
```

#### 5. Xóa bài tập
```
DELETE /exercises/:id
```

#### 6. Tăng số lượt làm bài
```
POST /exercises/:id/attempt
```

#### 7. Cập nhật điểm trung bình
```
POST /exercises/:id/score
Body: { "score": 8.5 }
```

## Cài đặt và Chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Cấu hình môi trường
Tạo file `.env` với nội dung:
```
MONGO_USER=your_username
MONGO_PASSWORD=your_password
```

### 3. Chạy ứng dụng
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## Nội dung Hóa 11 - Chương 1: Sự điện li

### Các chủ đề chính:

1. **Chất điện li - chất không điện li**
   - Khái niệm chất điện li
   - Chất điện li mạnh và yếu
   - Ví dụ về các chất

2. **Axit, bazơ và muối**
   - Định nghĩa theo Arrheniut
   - Phương trình điện li
   - Tính chất

3. **Phản ứng trao đổi ion trong dung dịch chất điện li**
   - Điều kiện xảy ra phản ứng
   - Viết phương trình ion đầy đủ
   - Viết phương trình ion rút gọn

4. **pH và chất chỉ thị axit-bazơ**
   - Khái niệm pH
   - Các chất chỉ thị màu
   - Ứng dụng

## Sample Data

File `src/exercises/sample-data.ts` chứa dữ liệu mẫu cho 4 bài tập:
- Bài 1: Khái niệm về sự điện li
- Bài 2: Axit - Bazơ - Muối
- Bài 3: Phản ứng trao đổi ion
- Đề kiểm tra 15 phút

Để import dữ liệu mẫu, có thể tạo một endpoint seed hoặc import thủ công qua API.

## Technologies

- **NestJS** - Framework backend
- **MongoDB** - Database
- **Mongoose** - ODM
- **TypeScript** - Programming language
- **Class Validator** - Validation

## License

UNLICENSED
