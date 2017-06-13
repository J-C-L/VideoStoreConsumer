// /src/app.js
// Import jQuery & Underscore
import $ from 'jquery';
import _ from 'underscore';

movie = new Movie({
  'title': 'Wonder Woman'
});


// ready to go
$(document).ready(function() {
  var movieView = new MovieView({
      model: movie
  });
  movieView.render();
});
