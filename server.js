const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Well, shit. We could\'t log to a file');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {});
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'You are a hero my friend!',
        headerText: 'This is the homepage header template'
    });
});

app.get('/about', (req, res) => {
    // res.send('<p>Liam is a great guy, you should totally buy him a car!');
    res.render('about.hbs', {
        pageTitle: 'About',
        headerText: 'This is the about page header template'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to get the data, you piece of human trash!'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});