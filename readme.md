# Implemented endpoints

- GET /api/profile
  - get user profile
- POST /api/login
  - User login
- POST/api/signup
  - Create new Student account
- GET /api/students
  - STUDENT: get list of students
  - ADMIN: get list of students with assignments
- GET /api/students/:studentId/assignments
  - get list of assignments for a student
- POST /api/students/:studentId/assignments
  - create an assignment for a student
- GET /api/students/:studentId/assignments/:assignmentId
  - get an assignment
- PUT /api/students/:studentId/assignments/:assignmentId
  - update an assignment
- PATCH /api/students/:studentId/assignments/:assignmentId
  - ADMIN ONLY: update an assignment's grades
- DELETE /api/students/:studentId/assignments/:assignmentId
  - delete and assignment
- GET /api/assignments/ungraded
  - ADMIN ONLY: get a list of students and their ungraded assignments
- GET /api/assignments/graded
  - ADMIN ONLY: get a list of students and their graded assignment