const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const Project = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  client: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  projectManager: {
    type: String,
    required: true
  },
  DevJr: {
    type: Number,
    required: true
  },
  DevMid: {
    type: Number,
    required: true
  },
  DevSr: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

Project.plugin(mongoosePaginate)

module.exports = mongoose.model('Project', Project)
