var express = require('express');

var app = express.createServer();

app.get('/', function(request, response) {
    response.sendfile('/index.html', {root: __dirname});
});

app.configure(function() {
    app.use('/css', express.static(__dirname + '/css'));
    app.use('/js', express.static(__dirname + '/js'));
    app.use('/images', express.static(__dirname + '/images'));
    app.use('/2010', express.static(__dirname + '/2010'));
    app.use('/2011', express.static(__dirname + '/2011'));
    app.use('/2012', express.static(__dirname + '/2012'));
    app.use('/2013', express.static(__dirname + '/2013'));
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Listening on ' + port);
});
