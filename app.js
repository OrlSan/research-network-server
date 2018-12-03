const debug = require('debug')('bootstrap');
const should = require('should');
const db = require('./sequelize');

db.sync()
.then(() => {
    global.should = should;
    /**
    * Using Sequelize
    **/
    const FactoryGirl = require('factory-girl');
    const path = require('path');
    const requireTree = require('require-tree');
    const factory = FactoryGirl.factory;
    const adapter = new FactoryGirl.SequelizeAdapter();
    const folder = path.join(process.cwd(), 'test', 'factories');
    const factories = requireTree(folder);
    factory.setAdapter(adapter);
    Object.keys(factories).forEach(key => {
      factories[key](factory);
    });
    factory.models = models;
    global.factory = factory;
    /**
    * Using Express
    **/
    const bodyParser = require('body-parser');
    const express = require('express');
    var mainRoutes = require('./routes/main');
    var userRoutes = require('./routes/users');

    const app = express();
    app.use(bodyParser.json());//Just for some express versions
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
    app.listen(3000, ()=>{
        console.log('Express server port 3000:  \x1b[36m%s\x1b[0m', 'ONLINE');
    });
})
.catch((err) => {
    debug("Databse not syncronized");
    debug(err);
    throw err;
});
