var express = require('express');

var app = express.createServer();

app.get('/', function(request, response) {
    response.sendfile(__dirname + '/public/index.html');
});

app.configure(function() {
    app.use('/public', express.static(__dirname + '/public'));
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Listening on ' + port);
});
