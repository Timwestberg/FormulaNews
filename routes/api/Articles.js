
// Scraping Route add additional sited over time to this area 


const express = require('express');
const router = express.Router();
// Article model
const Article = require('../../models/Article')

//@route GET api/articles
//@desc GET ALL ITEMS
//@access Public

// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

// This route only needs a "/" because we are calling api/articles in the server files where this is exported to
router.get("/", (req, res) => {


    //Make a request via axios for the news section of 'echo,js news'
    axios.get("http://www.echojs.com/").then((response) => {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        let $ = cheerio.load(response.data);



        // Now, we grab every h2 within an article tag, and do the following:
        $("article h2").each(function (i, element) {
            // Save an empty result object
            let result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            // Handles Validation for mongoose , wont allow anything without a title and link to be added
            if (result.title && result.link) {

                // Create a new Article using the `result` object built from scraping
                Article.create(result)

                    .then((dbArticle) => {

                        // View the added result in the console
                        console.log("this is echo news" + dbArticle);

                    })

                    .catch((err) => {

                        // If an error occurred, log it
                        console.log(err);

                    });
            }
        });

        // Send a message to the client
        console.log("Scrape Complete Echo NEws");
    });

    // Make a request via axios for the news section of `ycombinator`
    axios.get("https://news.ycombinator.com/").then((response) => {
        // Load the html body from axios into cheerio
        let $ = cheerio.load(response.data);
        // For each element with a "title" class

        $(".title").each((i, element) => {
            // Save the text and href of each link enclosed in the current element
            let result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(element).children("a").text();
            result.link = $(element).children("a").attr("href");


            // Handles Validation for mongoose , wont allow anything without a title and link to be added
            if (result.title && result.link) {

                // Create a new Article using the `result` object built from scraping
                Article.create(result)

                    .then((dbArticle) => {

                        // View the added result in the console
                        console.log("This is From Hacker News central" + dbArticle);

                    })
                    .catch((err) => {

                        // If an error occurred, log it
                        console.log(err);
                    });
            }
        });

        // Send a message to the client
        console.log("Scrape Complete for Hacker News Developers");
    });

    //Make a request via axios for the news section of 'Google Developer News'
    axios.get("https://developers.googleblog.com/").then((response) => {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        let $ = cheerio.load(response.data);


        $(".title").each((i, element) => {
            // Save the text and href of each link enclosed in the current element
            let result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(element).children("a").text();
            result.link = $(element).children("a").attr("href");



            // Handles Validation for mongoose , wont allow anything without a title and link to be added
            if (result.title && result.link) {

                // Create a new Article using the `result` object built from scraping
                Article.create(result)

                    .then((dbArticle) => {

                        // View the added result in the console
                        console.log("This is From Google Developers" + dbArticle);

                    })
                    .catch((err) => {

                        // If an error occurred, log it
                        console.log(err);
                    });
            }
        });

        // Send a message to the client
        console.log("Scrape Complete Google Developers");
    });

    // Let user know all Articles have now been updated
    res.send('All Articles have now been updated!')



});


// Export router for use in Server.js
module.exports = router;