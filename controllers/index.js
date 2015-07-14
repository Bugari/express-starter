"use strict";
module.exports = exports = {
    index: function(req, res, next){
      res.render('index', { title: 'Express' });
    }
};
