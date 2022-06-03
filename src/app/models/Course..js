const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongoosedelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, required: true, maxLength:200},
    description: { type: String, maxLength:500},
    image: { type: String, maxLength:255},
    videoID: { type: String, required: true, maxLength:255},
    slug: { type: String, slug: 'name', maxLength: 255, unique: true},
    
  }, {
    timestamps: true,
  });

  // Add plugins
  mongoose.plugin(slug);
  Course.plugin(mongoosedelete, { deletedAt : true, overrideMethods: 'all' });

  module.exports = mongoose.model("courses", Course);