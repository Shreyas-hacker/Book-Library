// eslint-disable-next-line strict
var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));

var ds = app.datasources.db;

ds.automigrate('books', function(err) {
  if (err) throw err;
    // initialize the data to be inserted
  var book = [
    {
      title: 'My first Blog',
      year: 2015,
      publisher: 'IBM',
      authorId: 1,
    },
  ];
  var count = book.length;
  // for each row create the data
  book.forEach(function(book) {
    app.models.books.create(book, function(err, model) {
      if (err) throw err;
      console.log('Createdmodel');
      count --;
      if (count === 0)
        ds.disconnect();
    });
  });
});
