var express = require('express');
var bodyParser = require('body-parser');
var Book = require(__dirname + '/../models/books');
var handleError = require(__dirname + '/../lib/handleServerError');

var booksRouter = module.exports = exports = express.Router();

booksRouter.get('/books', function(req, res) {
  Book.find({}, function(err, data) {
    if(err) return handleError(err, res);

    res.json(data);
  });
});

booksRouter.post('/books', bodyParser.json(), function(req, res) {
  var newBook = new Book(req.body);
  newBook.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

booksRouter.put('/books/:id', bodyParser.json(), function(req, res) {
  var bookData = req.body;
  delete bookData._id;
  Book.update({_id: req.params.id}, bookData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'Book success!'});
  });
});

booksRouter.delete('/books/:id', function(req, res) {
  Book.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});
