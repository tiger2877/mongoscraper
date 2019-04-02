// Require mongoose
var mongoose = require("mongoose");
// Create Schema object constructor
var Schema = mongoose.Schema;

// Create an article schematic to define the rules of the articles beings
// scraped.
var ArticleSchema = new Schema({
  // Here title is a required string because it's value is set to true for the
  // key, required.
  title: {
    type: String,
    required: true,
    unique: true,
  },
  // link is a required string and also unique to prevent duplicates
  link: {
    type: String,
    required: true,
    unique: true,
  },
  // summary is a required string and also unique to prevent duplicates
  summary: {
    type: String,
    required: true,
    unique: true,
  },
  // saved is a boolean to identify if the article is saved
  saved: {
    type: Boolean,
    default: false,
    required: false,
  },
  // `comment` is an array that stores ObjectIds
  // The ref property links these ObjectIds to the Comment model
  // This allows us to populate the Article with any associated Comment
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Exports the model
module.exports = Article;