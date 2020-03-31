// Require Libraries
const express = require('express');
const Tenor = require("tenorjs").client({
    "Key": "7E4ONEZA4SAS",
    "Filter": "high", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
});

// App Setup
const app = express();

// Middleware
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
app.get('/', (req, res) => {
    term = ""
    if (req.query.term) {
        term = req.query.term
    }
    // Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
    Tenor.Search.Query(term, "10")
        .then(response => {
            // store the gifs we get back from the search
            const gifs = response;
            // pass the gifs as an object into the home page
            res.render('home', { gifs })
        }).catch(console.error);
})

app.get('/', (req, res) => {
    const gifUrl = 'https://media1.tenor.com/images/561c988433b8d71d378c9ccb4b719b6c/tenor.gif?itemid=10058245'
    res.render('hello-gif', { gifUrl })
});

app.get('/greetings/:name', (req, res) => {
  const name = req.params.name;
  res.render('greetings', { name });
})

// Start Server
app.listen(3000, () => {
    console.log('Gif Search listening on port localhost:3000!');
});
