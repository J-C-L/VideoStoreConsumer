import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import MovieView from './movie_view';


var MovieListView = Backbone.View.extend({
  initialize: function(){

    var self = this;
    this.movieViewList = [];

    console.log(this.model);
    console.log("7777");


    this.model.forEach(function(rawMovie){
      self.addMovie(rawMovie);
    });

    this.listenTo(this.model, 'add', this.addMovie);
    this.listenTo(this.model, "update", this.render);
    // this.listenTo(this.model, 'remove', this.removeMovie);
  },
  render: function(){
    console.log("Hi from movielistview render");

    var self = this;
    self.$('.movie-list').empty();

    this.movieViewList.forEach(function(movieView) {
      movieView.render();
      self.$('.movie-list').append(movieView.$el);

    });
    return this;


  },
  addMovie: function(movie){

    var movieView = new MovieView({
        model: movie
    });
    this.movieViewList.push(movieView);

  }

});



export default MovieListView;
