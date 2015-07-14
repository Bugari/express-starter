"use strict";
let Router = require('named-routes');
let indexController = require('./controllers/index');

let applyRouter = function(app){
    let router = new Router();
    router.extendExpress(app);
    router.registerAppHelpers(app);
};

module.exports = exports = function(app){
    applyRouter(app);

    app.get('/', 'index', indexController.index);
};
