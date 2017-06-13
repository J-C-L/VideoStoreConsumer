
// Import jQuery & Underscore
import $ from 'jquery';
import _ from 'underscore';

// import Movie from 'models/movie';
import MovieList from 'collections/movie_list';
// import MovieView from 'views/movie_view';
import MovieListView from 'views/movie_list_view';

//this code has example code from the Rails App for accurate representation!
var movies = new MovieList([

      {
          "id": 1,
          "title": "Psycho",
          "overview": "When larcenous real estate clerk Marion Crane goes on the lam with a wad of cash and hopes of starting a new life, she ends up at the notorious Bates Motel, where manager Norman Bates cares for his housebound mother. The place seems quirky, but fine… until Marion decides to take a shower.",
          "release_date": "1960-06-16",
          "image_url": "http://lorempixel.com/185/278/",
          "external_id": null
      },
      {
          "id": 2,
          "title": "Jaws",
          "overview": "An insatiable great white shark terrorizes the townspeople of Amity Island, The police chief, an oceanographer and a grizzled shark hunter seek to destroy the bloodthirsty beast.",
          "release_date": "1975-06-19",
          "image_url": "http://lorempixel.com/185/278/",
          "external_id": null
      }]);


// ready to go
$(document).ready(function() {

var movieListView = new MovieListView({
model: movies,
el: $('.main-content')
});

movieListView.render();


});
