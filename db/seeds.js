const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const config = require('../nodemon.json')
const User = require('../api/models/user')

const reset = async () => {
  mongoose.connect(config.env.MONGO_DB_CONNECTION, { useNewUrlParser: true })
  // Careful with .remove() -- it sends a command directly to the database
  // and skips any mongoose validations
  await User.deleteMany() // Deletes all records
  return User.create([
    {
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@email.com',
      password: bcrypt.hashSync('password', 10),
      type: 'ADMIN'
    },
    {
      first_name: 'Student',
      last_name: 'User',
      email: 'student@email.com',
      password: bcrypt.hashSync('password', 10),
      type: 'STUDENT',
      assignments: [
        { 
          assignment_title: 'Flexbox Exercise',
          project_description: 'An exercise for working with Flexbox.',
          project_link: 'http://www.google.com'
        },
        { 
          assignment_title: 'HTML & CSS Final Project',
          project_description: 'My final project for the HTML & CSS course.',
          project_link: 'http://www.google.com'
        }
      ]
    }
  ])
}

reset().catch(console.error).then((response) => {
  console.log(`Seeds successful! ${response.length} records created.`)
  return mongoose.disconnect()
})
