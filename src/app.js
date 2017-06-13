// /src/app.js
// Import jQuery & Underscore
import $ from 'jquery';
import _ from 'underscore';

import Movie from 'models/movie';
import MovieView from 'views/movie_view';


var movie = new Movie({
  'title': 'Wonder Woman'
});


// ready to go
$(document).ready(function() {
  var movieView = new MovieView({
      model: movie
  });
  $('section').append(movieView.render().$el);
});
