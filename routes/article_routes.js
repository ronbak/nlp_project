var express = require('express');
var bodyParser = require('body-parser');
var Article = require(__dirname + '/../models/article').Article;

var articleRouter = module.exports = exports = express.Router();

articleRouter.get('/articles', function(req, res) {
  Article.find({}, function(err, data) {
    if(err) throw err;

    res.json(data);
  });
});

articleRouter.post('/articles', bodyParser.json(), function(req, res) {
  var newArticle = new Article(req.body);

  newArticle.save(function(err, data) {
    if(err) throw err;

    res.json(data);
  });
});


articleRouter.get('/articles/:id', function(req, res) {
  Article.find({_id: req.params.id}, function(err, data) {
    if(err) throw err;

    res.json(data);
  });
});

articleRouter.delete('/articles/:id', function(req, res) {

  Article.remove({_id: req.params.id}, function(err, data) {
    if(err) throw err;

    res.send('Deleted ' + data.name + '.');
  });
});
