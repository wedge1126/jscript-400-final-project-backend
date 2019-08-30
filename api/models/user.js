const mongoose = require('mongoose')

const assignmentSchema = mongoose.Schema({
  assignment_title: {
    type: String,
    required: [true, 'Assignment Title is required.']
  },
  project_description: {
    type: String,
    required: [true, 'Project Description is required.']
  },
  project_link: {
    type: String,
    required: [true, 'Project Link is required.']
  },
  grade: Number,
  maxGrade: Number
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: { 
    type: String, 
    required: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    required: true
  },
  type: { 
    type: String, 
    required: true, 
    enum: ['STUDENT', 'ADMIN']
  },
  assignments: [assignmentSchema]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('User', userSchema)
