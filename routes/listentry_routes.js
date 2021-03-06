var express = require('express');
var bodyParser = require('body-parser');
var List = require(__dirname + '/../models/list').List;
var Article = require(__dirname + '/../models/article').Article;
var ListEntry = require(__dirname + '/../models/listentry').ListEntry;
var updateListAndArticle = require(__dirname + '/../models/listentry').updateListAndArticle;
var listEntryRouter = module.exports = exports = express.Router();

//Currently no need for list entry GET or PUT requests.

listEntryRouter.post('/list-entries', bodyParser.json(), function(req, res) {
  var newListEntry = new ListEntry(req.body);

  newListEntry.save(function(err, data) {
    updateListAndArticle(newListEntry);
    if (err) throw err;
    res.json(data);
  });
});

listEntryRouter.delete('/list-entries/:id', function(req, res) {
  ListEntry.findOne({_id: req.params.id}, function(err, doc){
  Article.update({_id: doc.article}, {$pull: {lists: doc.list}}, function(err, model){
    if (err) throw err;
  });
  List.update({_id: doc.list}, {$pull: {articles: doc.article}}, function(err, model){
    if (err) throw err;
  ListEntry.remove({_id: req.params.id}, function(err, data) {
    if(err) throw err;

    res.send('Deleted list entry.');
  });
    });
  });


});
