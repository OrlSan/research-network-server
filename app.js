var express = require('express');
const bodyParser = require('body-parser');
var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/users');


var app = express();

app.use(bodyParser.json())
app.use('/', mainRoutes);
app.use('/users', userRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log('URL', fullUrl);
    var err = new Error('Not Found');
    err.status = 404;
    //next(err); 
    res.status(404).json({ //¿CUAL ES LA DIFERENCIA ENTRE NEXT Y RES.STATUS.JSON?
        msg: 'NOT FOUND'
    });
  });



app.listen(3000, () => {
    console.log('Express server port 3000:  \x1b[36m%s\x1b[0m', 'ONLINE');
});