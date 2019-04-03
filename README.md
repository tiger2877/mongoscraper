# All the News That's Fit to Scrape

### Overview

In this project, you'll create a web app that lets users view and leave comments on the latest news. But you're not going to actually write any articles; instead, you'll flex your Mongoose and Cheerio muscles to scrape news from another site.

See the deployed demo application [here](https://apple-custard-97439.herokuapp.com/articles).

### Prerequisites

NPM packages used for this project:

| Node APM | Description |
| --- | --- |
| express | https://www.npmjs.com/package/express|
| express-handlebars | https://www.npmjs.com/package/express-handlebars
| mongoose | https://www.npmjs.com/package/mongoose|
| cheerio | https://www.npmjs.com/package/cheerio|
| axios | https://www.npmjs.com/package/axios|

- - -

## Project Description

* This app will accomplish the following:

  1. Whenever a user visits your site, the app should scrape stories from a news outlet of your choice and display them for the user. Each scraped article should be saved to your application database. At a minimum, the app should scrape and display the following information for each article:

     * Headline - the title of the article

     * Summary - a short summary of the article

     * URL - the url to the original article

     * Feel free to add more content to your database (photos, bylines, and so on).

  2. Users should also be able to leave comments on the articles displayed and revisit them later. The comments should be saved to the database as well and associated with their articles. Users should also be able to delete comments left on articles. All stored comments should be visible to every user.

**Have fun!**
