// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");
// Requiring our Comment and Article models
var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");

module.exports = function (app) {

  app
    .get('/', function (req, res) {
      res.redirect('/articles');
    });

 // GET "/scrape" Scrape news websites  
 app.get("/scrape", function (req, res) {

  //use request dependecy to grab the body of the html
  axios.get("https://www.nytimes.com/section/food").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every article tag, and do the following:
    $("article").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("div")
        .children("h2")
        .text();
      result.link = $(this)
        .children("div")
        .children("h2")
        .children("a")
        .attr("href");
      result.summary = $(this)
        .children("div")
        .children("p.summary")
        .text();

      // Create a new Article using the `result` object built from scraping
      Article.create(result)
      .then(function(dbArticle) {
        // View the added result in the console
        console.log(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });
  });

  // Tell the browser that we finished scraping the text
  res.redirect("/");

  });
});

// This will get the articles we scraped from the mongoDB
app.get("/articles", function (req, res) {
// Grab every doc in the Articles array
  Article
    .find({}, function (err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        } else {
          res.render("index", {result: doc});
        }
        //Will sort the articles by most recent (-1 = descending order)
      })      
    .sort({'_id': -1});
  });

  // Grab an article by it's ObjectId
  app.get("/articles/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the
    // matching one in our db...
    Article.findOne({"_id": req.params.id})
    // ..and populate all of the comments associated with it
      .populate("comment")
    // now, execute our query
      .exec(function (err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        } else {
          res.render("comments", {result: doc});
          // res.json (doc);
        }
      });
  });

  // Create a new comment
  app.post("/articles/:id", function (req, res) {
    // Create a new Comment and pass the req.body to the entry
    Comment.create(req.body, function (err, doc) {
        if (err) {
          console.log(err);
        } else {
          // Use the article id to find and update it's comment
          Article.findOneAndUpdate({"_id": req.params.id}, {
            $push: {"comment": doc._id}
          }, {
            safe: true,
            upsert: true,
            new: true
          })
          // Execute the above query
            .exec(function (err, doc) {
              // Log any errors
              if (err) {
                console.log(err);
              } else {
                // Or send the document to the browser
                res.redirect('back');
              }
            });
        }
      });
  });

  // Delete a comment
  app.delete("/articles/:id/:commentid", function (req, res) {
    Comment.findByIdAndRemove(req.params.commentid, function (err, doc) {
      // Log any errors
      if (err) {
        console.log(err);
      } else {
        console.log(doc);
        Article.findOneAndUpdate({
          "_id": req.params.id
        }, {
          $pull: {
            "comment": doc._id
          }
        })
        // Execute the above query
          .exec(function (err, doc) {
            // Log any errors
            if (err) {
              console.log(err);
            }
          });
      }
  });
});

 // Clear the DB
app.get("/clearall", function(req, res) {
  // Remove every note from the notes collection
  Article.remove({}, function(err, res) {
    // Log any errors to the console
    if (err) {
      console.log(err);
      res.send(err);
    }
    else {
      // Otherwise, send the mongojs response to the browser
      // This will fire off the success function of the ajax request
      console.log(response);
      // Tell the browser that we finished scraping the text
      res.redirect("/");
    }
  });
});


};