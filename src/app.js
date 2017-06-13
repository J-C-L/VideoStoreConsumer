
// Import jQuery & Underscore
import $ from 'jquery';
import _ from 'underscore';

// import Movie from 'models/movie';
import MovieList from 'collections/movie_list';
// import MovieView from 'views/movie_view';
import MovieListView from 'views/movie_list_view';



var movies = new MovieList([
  {
  'title': 'Wonder Woman'},{
  'title': 'Xena Warrior Princess'
}]);


// ready to go
$(document).ready(function() {

var movieListView = new MovieListView({
model: movies,
el: $('.main-content')
});

movieListView.render();


});
