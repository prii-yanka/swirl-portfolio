const mongoose = require('mongoose')
const url = process.env.ATLAS_URI;
console.log(process.env)

const conn = mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {

    console.log('connected to MongoDB')
    // console.log(result)
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
// const db = conn._db('portfolio');
const ProjectSchema = new mongoose.Schema({
  project_name: {
    type: String,
    minLength: 4,
    maxLength: 50,
    required: true,
  },
  poster_image: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
    default: [],
  },
  technologies: {
    type: [String],
    required: true,
    default: [],
  },
  images: {
    type: [String],
    required: false,
    default: [],
  },
  video: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    minLength: 100,
    maxLength: 9000,
    required: true,
  },
  when: {
    type: [Date],
    required: false,
    default: [],
  },
  link_to: {
    type: String,
    required: false,
  }
});

ProjectSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
