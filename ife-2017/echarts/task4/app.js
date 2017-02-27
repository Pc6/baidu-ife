var http = require('http'),
    express = require('express'),
    app = express();

app.use('/', express.static(__dirname));

http.createServer(app).listen(3000, function() {
    console.log('Server is running...');
});
