var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
var stringifyFile = "";

app.use(bodyParser.json());

app.get('/getNote', function (req, res) {
    fs.readFile('./test.json', 'utf8', function (err, data) {
        if (err) throw err;
        stringifyFile = data
        res.send(data);
    });
});

app.post('/updateNote/:note', function (req, res) {
    fs.readFile('./test.json', 'utf8', function (err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
        obj.menu.notes.push(req.params.note);

        fs.writeFile('./test.json', JSON.stringify(obj), function (err) {
            if (err) throw err;
            console.log('file updated');
            res.end();
        });
    });
});

var server = app.listen(3000, function () {
    console.log('Przykładowa aplikacja nasłuchuje na http://localhost:3000');
});
